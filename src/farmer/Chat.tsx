import React, { useEffect, useState, useContext } from 'react'
import { Box, Button, CssBaseline, ThemeProvider, createTheme, Step, Stepper, StepLabel } from '@mui/material';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ActionRequest, ChatController, FileActionResponse, MuiChat } from 'chat-ui-react';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
//import {SimpleMapScreenshoter} from "leaflet-simple-map-screenshoter";


  const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
  };

  const muiTheme = createTheme({
    palette: {
      primary: {
        main: '#007aff',
      },
      
    },

  });

  const steps = [
    'Identification',
    'Selection',
    'Check',
    'Tokenisation',
    'Financing',
    'Harvest',
    'Selling',
    'Repayment'
  ]

const CropStatusContext = React.createContext();

function HorizontalLabelPositionBelowStepper() {
  const {tradeStatus, setTradeStatus} = useContext(CropStatusContext)
  const [position, setPosition] = useState();
  useEffect(() => {
    setPosition(steps.indexOf(tradeStatus))}
  ),[tradeStatus];
  return (
    <Box sx={{ width: '100%', marginTop: '20px' }}>
      <Stepper activeStep={position} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

 
  export function Chat(): React.ReactElement {
    const [tradeStatus, setTradeStatus] = useState("");
    const [chatCtl] = React.useState(
      new ChatController({
        showDateTime: true,
      }),
    );
    React.useMemo(() => {
      echo(chatCtl);
    }, [chatCtl]);

    async function echo(chatCtl: ChatController): Promise<void> {
      setTradeStatus("Identifcation")
      await chatCtl.addMessage({
        type: 'text',
        content: `Hi, how is your farm called?`,
        self: false,
      });
      const text = await chatCtl.setActionRequest({
        type: 'text',
        placeholder: 'Please enter something',
      });
      await chatCtl.addMessage({
        type: 'text',
        content: `Please provide your incorporation certificate.`,
        self: false,
      });
      const identity = (await chatCtl.setActionRequest({
        type: 'file',
        accept: 'image/*',
        multiple: true,
      })) as FileActionResponse;
      await chatCtl.addMessage({
        type: 'jsx',
        content: (
          <div>
            {identity.files.map((f) => (
              <img
                key={identity.files.indexOf(f)}
                src={window.URL.createObjectURL(f)}
                alt="File"
                style={{ width: '100%', height: 'auto' }}
              />
            ))}
          </div>
        ),
        self: false,
      });
      await chatCtl.addMessage({
        type: 'text',
        content: `Great to have your farm ${text.value} on board!`,
        self: false,
      });
      setTradeStatus("Selection")
      await chatCtl.addMessage({
        type: 'text',
        content: `Which crop would you like to finance?`,
        self: false,
      });
      const sel = await chatCtl.setActionRequest({
        type: 'multi-select',
        options: [
          {
            value: 'corn',
            text: 'Corn',
          },
          {
            value: 'hop',
            text: 'Hop',
          },
          {
            value: 'potato',
            text: 'Potatos',
          },
        ],
      });
      setTradeStatus("Check")
      await chatCtl.addMessage({
        type: 'text',
        content: `Ok, lets specify your ${sel.value} with more information for us to do due-diligence.`,
        self: false,
      });
      await chatCtl.addMessage({
        type: 'text',
        content: `Detecting your crop field`,
        self: false,
      });
      const map = await chatCtl.setActionRequest({
        type: 'custom',
        Component: Map,
      });
      setTradeStatus("Tokenisation")
      const mint = await chatCtl.setActionRequest({
        type: 'custom',
        Component: Mint,
      });
      setTradeStatus("Financing")
      const finance = await chatCtl.setActionRequest({
        type: 'custom',
        Component: Finance,
      });
      setTradeStatus("Harvest")
      await chatCtl.addMessage({
        type: 'text',
        content: `Please provide your certificate of conformance.`,
        self: false,
      });
      const file = (await chatCtl.setActionRequest({
        type: 'file',
        accept: 'image/*',
        multiple: true,
      })) as FileActionResponse;
      await chatCtl.addMessage({
        type: 'jsx',
        content: (
          <div>
            {file.files.map((f) => (
              <img
                key={file.files.indexOf(f)}
                src={window.URL.createObjectURL(f)}
                alt="File"
                style={{ width: '100%', height: 'auto' }}
              />
            ))}
          </div>
        ),
        self: false,
      });
      await chatCtl.addMessage({
        type: 'text',
        content: `Certificate of Conformance verified`,
        self: false,
      });
      setTradeStatus("Selling")
      const sell = await chatCtl.setActionRequest({
        type: 'custom',
        Component: Sell,
      });
      await chatCtl.addMessage({
        type: 'text',
        content: `How would you like to pay back?`,
        self: false,
      });
      setTradeStatus("Repayment")
      await chatCtl.addMessage({
        type: 'text',
        content: `How would you like to pay back?`,
        self: false,
      });
      const mulSel = await chatCtl.setActionRequest({
        type: 'select',
        options: [
          {
            value: 'USDT',
            text: 'USDT',
          },
          {
            value: 'USDC',
            text: 'USDC',
          },
        ],
      });
      await chatCtl.addMessage({
        type: 'text',
        content: `You have selected '${mulSel.value}'.`,
        self: false,
      });
    
      await chatCtl.addMessage({
        type: 'text',
        content: `Please pay 3000 USDT to 0x54dbb737eac5007103e729e9ab7ce64a6850a31`,
        self: false,
      });
    
      echo(chatCtl);
    }
  
    return (
      <CropStatusContext.Provider value={{tradeStatus, setTradeStatus}}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Box sx={{ height: '82vh', backgroundColor: 'gray' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              maxWidth: '640px',
              marginLeft: 'auto',
              marginRight: 'auto',
              bgcolor: 'background.default',
            }}
          >
            <Typography variant="h5" gutterBottom component="div">Crop Status</Typography>
            <div>
              <HorizontalLabelPositionBelowStepper/>
            </div>
            <Box sx={{ flex: '1 1 0%', minHeight: 0 }}>
              <MuiChat chatController={chatCtl} />
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
      </CropStatusContext.Provider>
    );
  }
  export default Chat;
  

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  });

function Map( {
  chatController,
  actionRequest,
}: {
   chatController: ChatController;
   actionRequest: ActionRequest;
 }) {
   const chatCtl = chatController;
  
   const setResponse = React.useCallback((): void => {
     const res = { type: 'custom', value: 'Expected corp yield is $3000' };
     chatCtl.setActionResponse(actionRequest, res);
   }, [actionRequest, chatCtl]);


   const [input, setInput] = useState("");
   const [disabled, setDisabled] = useState(false);
   const [location, setLocation] = useState([48.17, 11.65])//input.split(',').map(Number));
   const [located, setLocated ] = useState(false);

  useEffect(() => {
      var container = L.DomUtil.get("map");

      if (container != null) {
      container._leaflet_id = null;
      }
      var map = L.map("map").setView(location, 13);
      L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
          maxZoom: 18,
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          accessToken:
          "pk.eyJ1IjoidGFyLWhlbCIsImEiOiJjbDJnYWRieGMwMTlrM2luenIzMzZwbGJ2In0.RQRMAJqClc4qoNwROT8Umg",
      }
      ).addTo(map);
      const wmsOptions = {
        layers: 'Landsat-8',
        transparent: true,
        format: 'image/png'
      }
      const wmsLayer = L.tileLayer.wms('https://kade.si/cgi-bin/mapserv?', wmsOptions);
      wmsLayer.setOpacity(1) // optionnal
      wmsLayer.addTo(map);
      L.Marker.prototype.options.icon = DefaultIcon;
      var marker = L.marker(location).addTo(map);
      marker.bindPopup("<b>Field Selected").openPopup();
      //let map_image = new SimpleMapScreenshoter().addTo(this.map)

    }, []);

    function getCurrentLocation() {
      navigator.geolocation.getCurrentPosition(function(location) {
        console.log(location.coords.latitude);
        console.log(location.coords.longitude);
        console.log(location.coords.accuracy);
        setLocation([location.coords.latitude, location.coords.longitude])
      });
    };

    const handleLocation = () => {
      setLocated(true);
    };
return (
  <div>
    <div>
      <div id="map" style={{ height: "40vh", minWidth: '450px' }}></div>
      <Grid container style={{padding: '20px'}}>
        <Grid xs={1} align="center">
          <Button type="button" onClick={setResponse} variant="contained" color="primary" disabled={disabled}>Approve</Button>
        </Grid>
      </Grid>
    </div>
  </div>
);
}


function Mint({
  chatController,
  actionRequest,
}: {
  chatController: ChatController;
  actionRequest: ActionRequest;
}) {
  const chatCtl = chatController;

  const setResponse = React.useCallback((): void => {
    const res = { type: 'custom', value: 'Crop Token minted' };
    chatCtl.setActionResponse(actionRequest, res);
  }, [actionRequest, chatCtl]);

  return (
    <div>
      <Button
        type="button"
        onClick={setResponse}
        variant="contained"
        color="primary"
      >
        Create Crop Token
      </Button>
    </div>
  );
}

function Finance({
  chatController,
  actionRequest,
}: {
  chatController: ChatController;
  actionRequest: ActionRequest;
}) {
  const chatCtl = chatController;

  const setResponse = React.useCallback((): void => {
    const res = { type: 'custom', value: 'Crop financed' };
    chatCtl.setActionResponse(actionRequest, res);
  }, [actionRequest, chatCtl]);

  return (
    <div>
      <Button
        type="button"
        onClick={setResponse}
        variant="contained"
        color="primary"
      >
        Finance Crop Token
      </Button>
    </div>
  );
}

function Sell({
  chatController,
  actionRequest,
}: {
  chatController: ChatController;
  actionRequest: ActionRequest;
}) {
  const chatCtl = chatController;

  const setResponse = React.useCallback((): void => {
    const res = { type: 'custom', value: 'Crop sold' };
    chatCtl.setActionResponse(actionRequest, res);
  }, [actionRequest, chatCtl]);

  return (
    <div>
      <Button
        type="button"
        onClick={setResponse}
        variant="contained"
        color="primary"
      >
        Harvest & Sell Crop
      </Button>
    </div>
  );
}