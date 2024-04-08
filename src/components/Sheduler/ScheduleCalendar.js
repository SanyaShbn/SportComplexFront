import React, { Component } from 'react';
import 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler.css';
import { SERVER_URL } from '../../constants.js';
 
const scheduler = window.scheduler

export default class ScheduleCalendar extends Component {

    initSchedulerEvents() {

        if (scheduler._$initialized) {
            return;
        }

        const onDataUpdated = this.props.onDataUpdated;
        // const token = sessionStorage.getItem("jwt");
 
        scheduler.attachEvent('onEventAdded', (id, ev) => {
            if (onDataUpdated) {
                onDataUpdated('create', ev, id);
            }
            fetch(SERVER_URL + '/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization' : token
                },
                body: JSON.stringify(ev)
            })
            .then(response => {
                if (response.ok) {
                  //сообщение, используя Redux
                }
                else {
                  alert('Что-то пошло не так!');
                }
              })
              .catch(err => console.error(err))
        });
 
        scheduler.attachEvent('onEventChanged', (id, ev) => {
            console.log(ev.id)
            if (onDataUpdated) {
                onDataUpdated('update', ev, id);
            }
            fetch(SERVER_URL + '/api/events/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization' : token
                },
                body: JSON.stringify(ev)
            })
            .then(response => {
                if (response.ok) {
                  //сообщение, используя Redux
                }
                else {
                  alert('Что-то пошло не так!');
                }
              })
              .catch(err => console.error(err))
        });
 
        scheduler.attachEvent('onEventDeleted', (id, ev) => {
            if (onDataUpdated) {
                onDataUpdated('delete', ev, id);
            }
            fetch(SERVER_URL + "/api/events/" + id, {
                method: 'DELETE',
                // headers: { 'Authorization' : token }
            })
            .then(() => {
                //
            });
        });
        scheduler._$initialized = true;
        scheduler.i18n.setLocale("ru");
  }
     componentDidMount() {
        this.initializeScheduler();
    }
    
    initializeScheduler = () => {
        scheduler.config.header = [
            'day',
            'week',
            'month',
            'date',
            'prev',
            'today',
            'next'
        ];
        scheduler.config.hour_date = '%g:%i %A';
        scheduler.xy.scale_width = 70;
 
        this.initSchedulerEvents();

        const events = this.props.events
        
        scheduler.init(this.schedulerContainer, new Date());

        scheduler.parse(events, "json");
    }

    componentWillUnmount() {
      scheduler.clearAll();
    }

    shouldComponentUpdate(nextProps) {
        return this.props.timeFormatState !== nextProps.timeFormatState;
    }
 
    componentDidUpdate([prevProps]) {
        if (this.props.events !== prevProps.events) {
            this.initializeScheduler();
          }
    }
 
    setTimeFormat(state) {
        scheduler.config.hour_date = state ? '%H:%i' : '%g:%i %A';
        scheduler.templates.hour_scale = scheduler.date.date_to_str(scheduler.config.hour_date);
    }
 
    render() {
        const { timeFormatState } = this.props;
        this.setTimeFormat(timeFormatState);
        this.events = this.props
        return (
            <div
                ref={ (input) => { this.schedulerContainer = input } }
                style={ { width: '100%', height: '100%' } }
            />
        );
    }
}

// const ScheduleCalendar = ({ events }) => {
//     useEffect(() => {

//       scheduler.config.header = [
//         "day",
//         "week",
//         "month",
//         "date",
//         "prev",
//         "today",
//         "next"
//       ]
      
//       scheduler.init('scheduler_here', new Date(), 'month');

//       scheduler.parse(events, 'json');

//       return () => scheduler.clearAll();
//     }, [events]);

//     return (
//       <div id="scheduler_here" style={{ width: '100%', height: '100%' }}></div>
//     );
//   };
  
//   export default ScheduleCalendar;
