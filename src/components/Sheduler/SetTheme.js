import 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler.css';
import { useTheme } from '@mui/material/styles';

const scheduler = window.scheduler
const SetTheme = () => {
    const theme = useTheme();
    let color = theme.palette.mode;
    console.log(color)
    if(color === "dark"){
        scheduler.setSkin("dark");
     }
     else{
        scheduler.setSkin("material");
     }
}

export default SetTheme;
