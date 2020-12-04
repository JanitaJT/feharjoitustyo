import React, {useEffect, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import TrainingList from './TrainingList';

export default function ScheCale() {
    const [trainings, setTrainings] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        getTrainings();

    }, [])

    const getTrainings = () => {
        fetch("https://customerrest.herokuapp.com/gettrainings/")
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                setTrainings(data)
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        makeEvents();

    }, [trainings])

   const makeEvents = () => {
       var i;
       var eventit = [];
       for (i = 0; i < trainings.length; i++) {
           
        let joku = {};
        joku.title = trainings[i].customer.firstname + ' ' + trainings[i].customer.lastname + ' - ' + trainings[i].activity;
        joku.date = trainings[i].date;
        var loppu = new Date(trainings[i].date);
        loppu.setMinutes(loppu.getMinutes() + trainings[i].duration);
        joku.end = loppu;
        eventit.push(joku);
         
       }
    setEvents(eventit);
   }


    return (
        <div>
            <FullCalendar

                initialView="dayGridMonth"
                height="650px"
                headerToolbar={{
                    left: "prev,next",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay"
                }}
                plugins={[dayGridPlugin, timeGridPlugin]}
               events={events}
            

            />
        </div>
    )
}
