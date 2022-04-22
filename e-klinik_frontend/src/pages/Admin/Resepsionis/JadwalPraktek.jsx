import Toolbar from "@mui/material/Toolbar"
import React, { useContext, useEffect, useState } from "react";
import Dashboard from "../../../components/Layouts/Dashoard/Dashboard";
import JadwalPraktekNav from "../../../components/Navigations/JadwalPraktekNav";
import Paper from "@mui/material/Paper"
import { EditingState, IntegratedEditing, ViewState } from '@devexpress/dx-react-scheduler';
import blue from "@mui/material/colors/blue";
import red from "@mui/material/colors/red";
import orange from "@mui/material/colors/orange";
import { UserContext } from "../../../Helpers/Context";
import {
    Scheduler, Appointments,
    WeekView, AppointmentTooltip,
    Toolbar as ToolbarSchedule, DateNavigator,
    TodayButton,
    Resources,
    AppointmentForm,
    ConfirmationDialog
} from '@devexpress/dx-react-scheduler-material-ui'
import { DOMAIN_SERVER } from "../../../config";
import { useNavigate } from "react-router-dom";
import BasicLayoutForm from "../../../components/Calender/BasicLayoutForm";
import TextEditorForm from "../../../components/Calender/TextEditorForm";
import useTheme from "@mui/material/styles/useTheme";

const url = {
    index: DOMAIN_SERVER + '/api/jadwal-praktek',
    seminggu: DOMAIN_SERVER + '/api/jadwal-praktek/seminggu',
    dokter: DOMAIN_SERVER + '/api/dokter',
    create_jadwal: DOMAIN_SERVER + '/api/jadwal-praktek/create',
}
let memberDokter = []
const JadwalPraktek = () => {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const [currentDate, setCurrentDate] = useState(new Date())
    const [listJadwal, setListJadwal] = useState()
    const [mainResourcesName, setMainResourceName] = useState('status')
    const [dokter, setDokter] = useState();
    const [membersDokter, setMembersDokter] = useState([])
    const [appointmentsData, setAppointmentsData] = useState([])
    const [resources, setResources] = useState()
    const getDokter = () => {
        fetch(url.dokter)
            .then(response => response.json())
            .then(data => {
                if (data?.dokter) {
                    setDokter(data.dokter)
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    useEffect(() => {
        getDokter()
    }, [])
    useEffect(() => {
        if (dokter) {
            dokter.forEach((member, index) => {
                const fullName = `${member.nama_depan} ${member.nama_belakang || ''}`
                const filter = { id: member.id, text: fullName }
                memberDokter[index] = filter
                setMembersDokter(oldArray => [...oldArray, filter])
            })
        }
    }, [dokter])
    useEffect(() => {
        let unMounted = false;
        if (user?.role !== 'resepsionis' || !user) {
            navigate('/');
            return () => {
                unMounted = true
            }
        }
    }, [user])

    useEffect(() => {
        setResources([
            {
                fieldName: 'memberDokter',
                title: 'Dokter',
                allowMultiple: true,
                instances: membersDokter
            },
            {
                fieldName: 'status',
                title: 'Status',
                allowMultiple: false,
                instances: [
                    { id: "kerja", color: blue[500], text: 'Jam kerja' },
                    { id: "istirahat", color: orange[500], text: 'Jam istirahat' },
                    { id: "libur", color: red[500], text: 'Hari libur' },
                ]
            }
        ])
    }, [membersDokter])
    const changeMainResources = (newMainResources) => {
        setMainResourceName(newMainResources)
    }
    const fetchJadwal = () => {
        fetch(url.index)
            .then(response => response.json())
            .then(data => {
                setListJadwal(data?.jadwal_praktek)
            })
            .catch(err => {
                console.log(err);
            })
    }
    useEffect(() => {
        fetchJadwal()
    }, [])
    useEffect(() => {
        setAppointmentsData([])
        if (listJadwal) {
            Object.keys(listJadwal).forEach(tgl_praktek => {
                Object.keys(listJadwal[tgl_praktek]).forEach(jam_mulai => {
                    Object.keys(listJadwal[tgl_praktek][jam_mulai]).forEach(jam_selesai => {
                        Object.keys(listJadwal[tgl_praktek][jam_mulai][jam_selesai]).forEach(status => {
                            const jadwalCollection = listJadwal[tgl_praktek][jam_mulai][jam_selesai][status]
                            let itemAppointement = {}
                            itemAppointement.title = status;
                            itemAppointement.startDate = new Date(`${tgl_praktek} ${jam_mulai}`)
                            itemAppointement.endDate = new Date(`${tgl_praktek} ${jam_selesai}`)
                            // itemAppointement.id = jadwalCollection[0].id
                            itemAppointement.status = status.toLocaleLowerCase();
                            itemAppointement.memberDokter = []
                            itemAppointement.id_jadwal = []
                            jadwalCollection.forEach(itemJadwal => {
                                if (!itemAppointement.id) {
                                    itemAppointement.id = itemJadwal.id
                                }
                                itemAppointement.memberDokter.push(itemJadwal.id_dokter)
                                itemAppointement.id_jadwal.push(itemJadwal.id)
                            })
                            setAppointmentsData(oldArray => [...oldArray, itemAppointement])
                        })
                    })
                })
            })
        }
    }, [listJadwal])
    const tambahJadwal = async (formData) => {
        const postRequest = {
            method: 'POST',
            // body: formData,
            body: JSON.stringify(formData),
            headers: new Headers({
                'Accept': 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${user.token}`
            })
        }
        let response = await fetch(url.create_jadwal, postRequest);
        response = await response.json()
        if (response?.status === 'success') {
            fetchJadwal()
        }
    }
    const createDateFormat = (date) => {
        const year = date.getUTCFullYear()
        let month = date.getUTCMonth() + 1
        let day = date.getUTCDate()
        if (month < 10) {
            month = '0' + month
        }
        if (day < 10) {
            day = '0' + day
        }
        return year + '-' + month + '-' + day;
    }
    const createTimeFormat = (time) => {
        let hour = time.getHours()
        let minute = time.getMinutes()
        let second = time.getSeconds()
        if (hour < 10) {
            hour = '0' + hour
        }
        if (minute < 10) {
            minute = '0' + minute
        }
        if (second < 10) {
            second = '0' + second
        }
        return `${hour}:${minute}:${second}`
    }
    const createFormData = (form) => {
        const formData = {}
        Object.entries(form).forEach(([key, value]) => {
            formData[key] = value
        })

        formData.tgl_praktek = createDateFormat(form.startDate)
        formData.jam_mulai = createTimeFormat(form.startDate)
        formData.jam_selesai = createTimeFormat(form.endDate)

        return formData;
    }
    const commitChanges = ({ added, changed, deleted }) => {
        if (added) {
            tambahJadwal(createFormData(added))
        }
        if (changed) {
            console.log(changed);
        }
        if (deleted !== undefined) {
            console.log(deleted);
        }
    }
    const theme = useTheme()
    return (
        <Dashboard
            halaman="Jadwal Praktek"
        >
            <Toolbar />
            <JadwalPraktekNav />
            <Paper
                sx={{ margin: '1rem 2rem' }}
            >
                <Scheduler
                    data={appointmentsData}
                // height={500}
                >
                    <ViewState
                        currentDate={currentDate}
                        onCurrentDateChange={e => setCurrentDate(e)}
                    />
                    <EditingState
                        onCommitChanges={commitChanges}
                    />
                    <IntegratedEditing />
                    <WeekView
                        cellDuration={60}
                        startDayHour={7}
                        endDayHour={17}
                    />
                    <ToolbarSchedule />
                    <DateNavigator />
                    <TodayButton
                        component="span"
                    />
                    <ConfirmationDialog />
                    <Appointments />
                    <AppointmentTooltip
                        showDeleteButton
                        showCloseButton
                        showOpenButton
                    />
                    <AppointmentForm
                        basicLayoutComponent={BasicLayoutForm}
                        textEditorComponent={TextEditorForm}
                    />
                    <Resources
                        data={resources}
                        mainResourceName={mainResourcesName}
                    />
                </Scheduler>
            </Paper>
        </Dashboard>
    )
}
export default JadwalPraktek;