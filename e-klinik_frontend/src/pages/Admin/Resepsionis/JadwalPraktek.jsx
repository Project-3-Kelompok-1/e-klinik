import Toolbar from "@mui/material/Toolbar"
import React, { useContext, useEffect, useState } from "react";
import Dashboard from "../../../components/Layouts/Dashoard/Dashboard";
import JadwalPraktekNav from "../../../components/Navigations/JadwalPraktekNav";
import Paper from "@mui/material/Paper"
import Backdrop from "@mui/material/Backdrop";
import Snackbar from "@mui/material/Snackbar";
import Alert from "../../../components/Feedback/Alert";
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
import BooleanEditorForm from "../../../components/Calender/BooleanEditorForm";
import { CircularProgress } from "@mui/material";
import RecurrenceLayoutForm from "../../../components/Calender/RecurrenceLayout";
import { isDokter, isResepsionis } from "../../../Helpers/checkUser";

const url = {
    index: DOMAIN_SERVER + '/api/jadwal-praktek',
    seminggu: DOMAIN_SERVER + '/api/jadwal-praktek/seminggu',
    dokter: DOMAIN_SERVER + '/api/dokter',
    create_jadwal: DOMAIN_SERVER + '/api/jadwal-praktek/create',
    update_jadwal: DOMAIN_SERVER + '/api/jadwal-praktek/update',
    delete_jadwal: DOMAIN_SERVER + '/api/jadwal-praktek/delete'
}
let memberDokter = []
let alertMessage = "Success";
const mainResourcesName = 'status'
const JadwalPraktek = () => {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const [currentDate, setCurrentDate] = useState(new Date())
    const [listJadwal, setListJadwal] = useState()
    const [dokter, setDokter] = useState();
    const [membersDokter, setMembersDokter] = useState([])
    const [appointmentsData, setAppointmentsData] = useState([])
    const [resources, setResources] = useState()
    const [loading, setLoading] = useState(false)
    const [visibleForm, setVisibleForm] = useState(false)
    const [selectedAppointment, setSelectedAppointment] = useState()
    const [openAlert, setOpenAlert] = useState(false)
    const [severityAlert, setSeverityAlert] = useState('success')
    const showAlert = () => {
        setOpenAlert(true)
    }
    const hideAlert = (event, reason) => {
        if (reason === 'clickwat') {
            return;
        }
        setOpenAlert(false)
    }
    const formVisibilityChange = () => {
        setVisibleForm(!visibleForm)
    }
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
        (async () => {
            const result = await isResepsionis() || await isDokter()
            if (!result || !user) {
                navigate('/')
            }
        })()
    }, [user, navigate])
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
    const fetchJadwal = () => {
        setLoading(true)
        fetch(url.index)
            .then(response => response.json())
            .then(data => {
                setListJadwal(data?.jadwal_praktek)
                setLoading(false)

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
                            itemAppointement.title = jadwalCollection[0].title;
                            itemAppointement.startDate = new Date(`${tgl_praktek} ${jam_mulai}`)
                            itemAppointement.endDate = new Date(`${tgl_praktek} ${jam_selesai}`)
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
    const postJadwal = async (formData, urlTarget = url.index) => {
        setLoading(true)
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
        let response = await fetch(urlTarget, postRequest);
        response = await response.json()
        fetchJadwal()
        if (response.message) {
            if (response?.status === 'success') {
                setSeverityAlert("success")
                alertMessage = response.message;
            }
            showAlert();
        }
        console.log(response);
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
        if (form.startDate && form.endDate) {
            formData.tgl_praktek = createDateFormat(form.startDate)
            formData.jam_mulai = createTimeFormat(form.startDate)
            formData.jam_selesai = createTimeFormat(form.endDate)
        }

        return formData;
    }
    const updateFormData = (formData, newFormData) => {
        Object.entries(newFormData).forEach(([key, value]) => {
            Object.entries(value).forEach(([attribut, row]) => {
                formData[`new_${attribut}`] = row
            })
            if (value.startDate) {
                formData.new_tgl_praktek = createDateFormat(value.startDate)
                formData.new_jam_mulai = createTimeFormat(value.startDate)
            }
            if (value.endDate) {
                formData.new_jam_selesai = createTimeFormat(value.endDate)
            }
        })

        return formData
    }
    const commitChanges = ({ added, changed, deleted }) => {
        if (added) {
            postJadwal(createFormData(added), url.create_jadwal)
        }
        if (changed) {
            // console.log(changed);
            let formData = createFormData(selectedAppointment);
            formData = updateFormData(formData, changed)
            postJadwal(formData, url.update_jadwal)
        }
        if (deleted !== undefined) {
            // console.log(deleted);
            // console.console.log(listJadwal[deleted - 1]);
            let deleteSelected = {}
            for (let i = 0; i < appointmentsData.length; i++) {
                if (appointmentsData[i].id === deleted) {
                    deleteSelected.id = appointmentsData[i].id_jadwal
                    break
                }
            }
            postJadwal(deleteSelected, url.delete_jadwal);
        }
    }
    // Menangani perubahan pada nilai properti editingAppointment.
    const editingAppointment = (appointment) => {
        // Memliih appointment yang akan di update
        setSelectedAppointment(appointment)
    }
    return (
        <>
            <Snackbar
                open={openAlert}
                autoHideDuration={6000}
                onClose={hideAlert}
            >
                <Alert
                    onClose={hideAlert}
                    severity={severityAlert}
                    sx={{ width: '100%' }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
            <Dashboard
                halaman="Jadwal Praktek"
            >
                <Toolbar />
                <JadwalPraktekNav
                    formVisibilityChange={formVisibilityChange}
                />
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
                            onEditingAppointmentChange={editingAppointment}
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
                            visible={visibleForm}
                            onVisibilityChange={formVisibilityChange}
                            basicLayoutComponent={BasicLayoutForm}
                            textEditorComponent={TextEditorForm}
                            booleanEditorComponent={BooleanEditorForm}
                            recurrenceLayoutComponent={RecurrenceLayoutForm}
                        // messages={}
                        />
                        <Resources
                            data={resources}
                            mainResourceName={mainResourcesName}
                        />
                    </Scheduler>
                </Paper>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Dashboard>
        </>
    )
}
export default JadwalPraktek;