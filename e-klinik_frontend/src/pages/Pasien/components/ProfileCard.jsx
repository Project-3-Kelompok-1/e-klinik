import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Card, CardActions, CardContent, CardMedia, Collapse, Divider, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton  {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));
const ProfileCard = ({ profile, user, expandComponent, expandButton }) => {
    const [expanded, setExpanded] = useState(false)
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <Card variant="outlined" elevation={0}>
            <CardMedia
                component="img"
                image="https://image-cdn.medkomtek.com/87Ot9M7pV7aGdsPDc8bV_tKa6F0=/1280x720/smart/filters:quality(75):strip_icc():format(jpeg)/klikdokter-media-buckets/medias/2320143/original/029932100_1602670069-Sindrom-Good-Girl-Penyebab-Wanita-Sulit-Bahagia-shutterstock_1639602457.jpg"

            />
            <CardContent sx={{ paddingLeft: '1rem' }}>
                <Typography gutterBottom variant="h5" component="div" color="text.primary">
                    {user.username}
                </Typography>
                <Typography
                    variant="body2" color="text.secondary"
                >
                    {profile.alamat_rumah ? profile.alamat_rumah : '-'}
                </Typography>
                <Divider sx={{ marginTop: 3 }} />
            </CardContent>
            <CardActions sx={{ paddingLeft: '1rem', paddingBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                <Button
                    // size="small" 
                    variant="contained"
                    component="span"
                    color="warning"
                    sx={{ textTransform: 'none' }}
                >
                    Ubah Profile
                </Button>
                {expandButton && (
                    <ExpandMore
                        expand={expanded}
                        component="span"
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                )}
            </CardActions>
            {expandButton ? (
                <Collapse
                    in={expanded}
                    timeout="auto"
                    unmountOnExit
                >
                    {expandComponent}
                </Collapse>
            ) : null}
        </Card>
    )
}
export default ProfileCard