import { React, useState } from 'react'
import logo from "../media/logo2.png"
import LayoutComponent from "../layout/layoutcomponent"
import Alert from '@mui/material/Alert';
import { useEffect } from 'react';

import config from '../config/config'

const Client = () => {
  const [locationInfo, setLocationInfo] = useState(false)
  const handleChangeLocation = (event) => {
    const currentVehicle = localStorage.getItem('vehicleId');
    // update location on db
    const pushCurrPos = async (position) => fetch(`${config.API_BASE_URL}/update/${currentVehicle}`, {
      method: "POST",
      body: JSON.stringify({ pos: position }),
      headers: { 'Content-Type': 'application/json' },
    }).then(res => {
      if (!res.ok) console.log('Error: ', res); 
    })
    .catch(err => {throw err});

    // get location from gps
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        console.log(position);
        
        setLocationInfo(true);
        let newPositionObj = {
          timestamp: position.timestamp,
          coords: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        }
        if (currentVehicle) pushCurrPos(newPositionObj);
      });
    }
  };

  useEffect(() => {
    handleChangeLocation()
  }, [])



  return (

    <>
      <LayoutComponent>
        <div className='userDetails'>
          <div className='Icons'>
            <div className='type'>
              <img src="https://img.icons8.com/bubbles/50/null/user.png" />
              <span style={{ fontSize: "12px", paddingRight: "10px" }}>{localStorage.getItem('driverName')}</span>
            </div>

            <div className='type'>
              <img src="https://img.icons8.com/color/40/null/interstate-truck.png" />
              <span style={{ fontSize: "12px" }}>{localStorage.getItem('VehicleName')}</span>
            </div>


            <div className='VehicleNo'>
              <div className='Plate' style={{ fontWeight: "bold" }}>
                IND
                <br />
                <img src={logo} style={{ width: "20px", height: "auto" }} alt=""></img>
              </div>
              <div className='Number'>
                {localStorage.getItem('VehicleNo')}
              </div>
            </div>


            <div className='Company'>
              <div className='type'>
                <span style={{ fontSize: "large" }}>Indian Oil Corp. Ltd</span>
              </div>

              <div className='type'>
                <img src="https://img.icons8.com/external-those-icons-lineal-color-those-icons/30/null/external-distance-maps-and-locations-those-icons-lineal-color-those-icons.png" alt="distance-travelled" />
                <span>Distace Travelled</span>
              </div>

              <div className='type' style={{ gap: "10px" }}>
                <img src="https://img.icons8.com/external-those-icons-lineal-color-those-icons/30/null/external-distance-maps-and-locations-those-icons-lineal-color-those-icons-1.png" alt="" />
                <span>Overall Distance</span>
                <div>
                </div>
                <div>
                  {/* <FormControlLabel control={<Switch 
          onClick={handleChange}
          //defaultChecked
          />} label="Enabled Location" /> */}
                  <br />
                  {locationInfo ? <Alert severity="success">Your location is being shared</Alert> : <Alert severity="warning">Please Click 'Allow' to send your location</Alert>}

                </div>
              </div>
            </div>

          </div>
        </div>

      </LayoutComponent>
    </>

  )
}

export default Client