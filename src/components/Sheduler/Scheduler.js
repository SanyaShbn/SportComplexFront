import { useEffect, useState } from "react";
import './Scheduler.css';
import './Toolbar.css';
import './MessageArea.css';
import Toolbar from "./Toolbar.js"
import MessageArea from "./MessageArea.js"
import ScheduleCalendar from "./ScheduleCalendar.js"
import { SERVER_URL } from '../../constants.js';

const Scheduler = ({ setSelectedLink, link }) => {

	// const [trainings, setTrainings] = useState([]);
	// const [schedule_data, setScheduleData] = useState([])

	const [events, setEvents] = useState([]); 
	const [rows, setRows] = useState([])

    useEffect(() => {
        setSelectedLink(link);
		fetchEvents();
      }, []);

	  const fetchEvents = () => {
		// const token = sessionStorage.getItem("jwt");
		fetch(SERVER_URL + '/api/events', {
		//   headers: { 'Authorization' : token }
		})
		.then(response => response.json())
		.then(data => {
			setEvents(data._embedded.events)
	    })
		.catch(err => console.error(err)); 
	}
    
	const [currentTimeFormatState, setTimeFormat] = useState(true);
	const [messages, setMessages] = useState([]);

	function addMessage(message) {
		setMessages((arr) => [...arr, message]);
	}

	function logDataUpdate(action, ev, id) {
		const text = ev && ev.text ? ` (${ev.text})` : "";
		const message = `event ${action}: ${id} ${text}`;
		addMessage(message);
	}

	// useEffect(() => {
	// 	const updateRows = async () => {
	// 	  const updatedRows = await Promise.all(events.map(async event => ({
	// 		id: event.id,
	// 		start_date: "2024-04-08 2:00",
	// 		end_date: "2024-04-08 8:00",
	// 		text: event.text,
	// 	  })));
	// 	  setRows(updatedRows);
	// 	};
	// 	updateRows();
	//   }, [events]);
                 
	//   const data = rows
	//   console.log(data)
	// const showTrainings = () => {
	// 	let i = 0
	// 	const trainings_arr = trainings.map(training => ({
	// 		start_date: "2024-04-25 18:30",
	// 		end_date: "2024-04-25 19:30",
	// 		text: 'Абоба',
	// 		id: i++
	// 	  }));
	// 	setScheduleData(trainings_arr)
	// 	console.log(schedule_data)
	// }
	return (
		<div>
			<div className="tool-bar">
				<Toolbar
					timeFormatState={currentTimeFormatState}
					onTimeFormatStateChange={setTimeFormat}
				/>
			</div>
			<div className="scheduler-container">
				<ScheduleCalendar
					events={events}
					timeFormatState={currentTimeFormatState}
					onDataUpdated={logDataUpdate}
				/>
			</div>
			<div className="message-area">
			<MessageArea messages={messages} />
			</div>
		</div>
	);
}
export default Scheduler;
