import styled from "@mui/material/styles/styled";
import { Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
const PREFIX = 'Demo';
const classes = {
    container: `${PREFIX}-container`,
    text: `${PREFIX}-text`,
};
const StyledDiv = styled('div')(({ theme }) => ({
    [`&.${classes.container}`]: {
        display: 'flex',
        marginBottom: theme.spacing(2),
        justifyContent: 'flex-end',
    },
    [`& .${classes.text}`]: {
        ...theme.typography.h6,
        marginRight: theme.spacing(2),
    },
}))
const ResourceSwitcher = (({
    mainResourcesName, onChange, resources
}) => {
    return (
        <StyledDiv
            className={classes.container}
        >
            <div
                className={classes.text}
            >
                Main resource name:
            </div>
            <Select
                variant="standard"
                value={mainResourcesName}
                onChange={e => onChange(e.target.value)}
            >
                {resources.map(resource => (
                    <MenuItem key={resource.fieldName} value={resource.fieldName}>
                        {resource.title}
                    </MenuItem>
                ))}
            </Select>
        </StyledDiv>
    )
})
export default ResourceSwitcher