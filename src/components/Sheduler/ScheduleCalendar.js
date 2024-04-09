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
            .then(
                scheduler.render()
              )
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

        // const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL + '/api/events', {
             headers: {
            //   'Authorization' : token
            }
        })
        .then(response => response.json())
        .then(data => {
            scheduler.parse(data, 'json');
        })
        .catch(error => console.error(error));

        fetch(SERVER_URL + '/api/view_trainings', {
            headers: {
                //   'Authorization' : token
                }
              })
              .then(response => response.json())
              .then(data => {
                const options = data.map(item => ({
                    key: item.idTraining,
                    label: "Трунировка №" + item.idTraining,
                }));
                  scheduler.config.lightbox.sections = [
                      { 
                          name:"Тренировка", 
                          height:21, 
                          inputWidth:400, 
                          map_to:"text", 
                          type:"select", 
                          options: scheduler.serverList("options", options)
                      },
                      {name:"time", height:72, type:"time", map_to:"auto"}
                  ];
              })
        .catch(err => console.error(err));

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
         
        scheduler.templates.event_text = scheduler.templates.event_bar_text = function(start, end, event){
            var options = scheduler.serverList("options");
         
            for(var i = 0; i < options.length; i++){
                if(options[i].key == event.text){
                    return options[i].label;
                }
            }
         
            return "";
        };
        
        scheduler.init(this.schedulerContainer, new Date());
    }
    
    // fetchAndParseEvents() {
    //     fetch(SERVER_URL + '/api/events')
    //         .then(response => response.json())
    //         .then(data => {
    //             scheduler.parse(data._embedded.events, 'json');
    //             localStorage.setItem('events', JSON.stringify(data._embedded.events));
    //         })
    //         .catch(error => console.error(error));

    // }

    
    componentWillUnmount() {
      scheduler.clearAll();
    }

    shouldComponentUpdate(nextProps) {
        return this.props.timeFormatState !== nextProps.timeFormatState;
    }
 
    componentDidUpdate() {
        scheduler.render();
    }
 
    setTimeFormat(state) {
        scheduler.config.hour_date = state ? '%H:%i' : '%g:%i %A';
        scheduler.templates.hour_scale = scheduler.date.date_to_str(scheduler.config.hour_date);
    }
 
    render() {
        const { timeFormatState } = this.props;
        this.setTimeFormat(timeFormatState);
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
