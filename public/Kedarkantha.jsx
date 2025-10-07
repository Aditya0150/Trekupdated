import React from 'react';
import KedarkanthaImg from "../Itinerary/kedarkantha1.jpg";
import { Link } from "react-router-dom";
import {
  Mountain,
  MapPin,
  Clock,
  Users,
  TreePine,
  Sun,
  Calendar,
  Route,
  Home,
  AlertTriangle
} from 'lucide-react';
import '../styles/Valleyofflower.css';

function KedarkanthaTrek() {
  return (
    <div className="container">
      <h1 className="main-heading">Kedarkantha Trek – 5 Nights / 6 Days</h1>
      <section className="section about-section">
        <h2 className="section-title"><TreePine /> About Kedarkantha</h2>
        <div className="about-content">
          <div className="about-text">
            <p className="section-text">
              Kedarkantha is one of the most popular winter treks in India, located in the Govind Wildlife Sanctuary of Uttarkashi. Known for its scenic campsites, snow-covered trails, and a 360° view of snow-clad peaks from the summit, it is an ideal trek for both beginners and experienced trekkers.
            </p>
            <div className="highlight-stats">
              <div className="highlight-stat">
                <Mountain className="highlight-icon" />
                <div><span className="highlight-number">12,500</span><span className="highlight-label">ft Altitude</span></div>
              </div>
              <div className="highlight-stat">
                <Calendar className="highlight-icon" />
                <div><span className="highlight-number">6</span><span className="highlight-label">Days Trek</span></div>
              </div>
              <div className="highlight-stat">
                <TreePine className="highlight-icon" />
                <div><span className="highlight-number">Snowy</span><span className="highlight-label">Winter Trails</span></div>
              </div>
            </div>
          </div>
          <div className="about-image">
            <img src={KedarkanthaImg} alt="Kedarkantha Summit" className="nature-image" />
          </div>
        </div>
      </section>
      <section className="section">
        <h2 className="section-title"><MapPin /> Detailed Itinerary</h2>

        {[
          {
            day: 1,
            title: "Dehradun to Sankri",
            subtitle: "Trek Base Arrival",
            details: [
              { icon: <Route />, label: "Distance", value: "200 km" },
              { icon: <Clock />, label: "Duration", value: "10 hrs" },
              { icon: <Home />, label: "Stay", value: "Sankri Guesthouse" }
            ],
            bullets: [
              "Drive through scenic Himalayan terrain",
              "Reach Sankri by evening"
            ]
          },
          {
            day: 2,
            title: "Sankri to Juda Ka Talab",
            subtitle: "Trek Begins",
            details: [
              { icon: <Mountain />, label: "Trek", value: "4 km (4 hrs)" },
              { icon: <Home />, label: "Stay", value: "Juda Ka Talab Camp" }
            ],
            bullets: [
              "Snowy pine forests and frozen lake",
              "Overnight camp under the stars"
            ]
          },
          {
            day: 3,
            title: "Juda Ka Talab to Kedarkantha Base",
            subtitle: "Alpine Wonderland",
            details: [
              { icon: <Mountain />, label: "Trek", value: "4 km (3 hrs)" },
              { icon: <Home />, label: "Stay", value: "Base Camp" }
            ],
            bullets: [
              "Snowy trails and open meadows",
              "Spectacular views of Swargarohini"
            ]
          },
          {
            day: 4,
            title: "Kedarkantha Summit → Base → Sankri",
            subtitle: "Summit Day",
            details: [
              { icon: <Mountain />, label: "Summit", value: "12,500 ft" },
              { icon: <Clock />, label: "Total Trek", value: "12 km" }
            ],
            bullets: [
              "Early morning summit climb",
              "360° Himalayan views from top",
              "Descend back to Sankri"
            ]
          },
          {
            day: 5,
            title: "Buffer/Contingency Day",
            subtitle: "Weather Flexibility",
            details: [],
            bullets: [
              "Extra day to accommodate delays or snowfall",
              "Used only if required"
            ]
          },
          {
            day: 6,
            title: "Sankri to Dehradun",
            subtitle: "Return Journey",
            details: [],
            bullets: [
              "Drive back to Dehradun with unforgettable memories"
            ]
          }
        ].map(({ day, title, subtitle, details, bullets }) => (
          <div key={day} className="itinerary-card">
            <div className="itinerary-header">
              <div className="day-circle">{day}</div>
              <div className="itinerary-day-info">
                <h3>{title}</h3>
                <p className="itinerary-subtitle">{subtitle}</p>
              </div>
            </div>
            <div className="info-grid">
              {details.map((d, idx) => (
                <div key={idx} className="info-item">
                  {d.icon}
                  <div className="info-content">
                    <span className="info-label">{d.label}</span>
                    <span className="info-value">{d.value}</span>
                  </div>
                </div>
              ))}
            </div>
            <ul>
              {bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>
        ))}
      </section>
      <section className="section">
        <h2 className="section-title"><Users /> Inclusions</h2>
        <ul className="list">
          <li>5 nights stay in tents/lodges</li>
          <li>All veg meals during trek</li>
          <li>Transport from Dehradun (round trip)</li>
          <li>Guide, permits, and camping equipment</li>
        </ul>
      </section>
      <section className="section important-note">
        <h2 className="section-title"><AlertTriangle /> Important Note</h2>
        <div className="notice-box">
          <p className="notice-heading">⚠️ Carry insulated layers!</p>
          <p>Temperatures can drop below -5°C. Wear thermals and down jackets during night stays.</p>
        </div>
      </section>
      <section className="section">
        <h2 className="section-title"><TreePine /> Essentials To Carry</h2>
        <ul className="list">
          <li>Thermal innerwear & padded jacket</li>
          <li>Snow trekking boots & gaiters</li>
          <li>Cap, gloves, headlamp, flask</li>
          <li>Snacks, first-aid, rain poncho</li>
        </ul>
      </section>
      <div className="price-section">
        <div className="price-container">
          <h2 className="price-title">
            Price: <span className="price-highlight">₹8,499/-</span> (Ex-Dehradun)
          </h2>
          <Link to="/Contact" className="book-button">Book Now</Link>
        </div>
      </div>
    </div>
  );
}

export default KedarkanthaTrek;