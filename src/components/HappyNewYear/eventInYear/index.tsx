// src/Component/HappyNewYear/EventCards.tsx
import React from 'react'
import './evenInYear.scss'

const events = [
  { title: 'VALENTINE NGỌT NGÀO', date: '14 - 16/02', icon: 'heart' },
  { title: 'TUẦN LỄ VÀNG', date: '21 - 23/02', icon: 'gift' },
  { title: 'MỪNG NGÀY THẦY THUỐC VIỆT NAM', date: '27 - 02/03', icon: 'stethoscope' },
  { title: 'QUAY SỐ TRÚNG VÀNG', date: '08/03', icon: 'trophy' },
]

const EventCards = () => {
  return (
    <div className="event-cards">
      <h2 className="event-month">--- Các sự kiện sắp tới ---</h2>
      <div className="event-cards-container">
        {events.map((event, index) => (
          <div key={index} className="event-card">
            {/* <div className={`event-icon ${event.icon}`}></div> */}

            <h3>{event.title}</h3>
            <p>{event.date}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EventCards
