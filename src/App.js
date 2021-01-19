import "./App.css";
import { useState } from "react";
import ReactLoading from "react-loading";

import {  fadeInDown } from "react-animations";
import { StyleSheet, css } from "aphrodite";

////////////////////////////////////////////////////////////////
function App() {
  ///////////////
  ////////////////////////////////////
  const [unit, setUnit] = useState("C");
  const [q, setQ] = useState("");
  const [data, setData] = useState(null);
  const [isShowEdit, setIsShowEdit] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [CurrentDateTime, setCurrentDateTime] = useState({
    date: "",
    time: "",
  });
  ///''///////////////////////////////////
  const API_KEY = "ff05f8c09dfd8d8f97450980f607a648";
  const API_URI = `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${API_KEY}`;
  ///////////////////
  // const testData = {
  //   coord: { lon: 88.2667, lat: 24.1833 },
  //   weather: [
  //     { id: 800, main: "Clear", description: "clear sky", icon: "01d" },
  //   ],
  //   base: "stations",
  //   main: {
  //     temp: 300.96,
  //     feels_like: 297.68,
  //     temp_min: 300.96,
  //     temp_max: 300.96,
  //     pressure: 1011,
  //     humidity: 27,
  //     sea_level: 1011,
  //     grnd_level: 1008,
  //   },
  //   visibility: 10000,
  //   wind: { speed: 3.72, deg: 287 },
  //   clouds: { all: 2 },
  //   dt: 1610443627,
  //   sys: { country: "IN", sunrise: 1610412724, sunset: 1610451472 },
  //   timezone: 19800,
  //   id: 1262412,
  //   name: "Murshidābād",
  //   cod: 200,
  // };

  // functions
  const realTime = (epc) => {
    const myDate = new Date(epc * 1000);
    const a = myDate.toLocaleString();
    const b = a.split(",");
    const dateStr = b[1].replace(" ", "");
    // alert(dateStr);
    return dateStr;
  };

  // realTime(data.sys.sunrise);

  // celcious
  const changeToC = (klvn) => {
    const c = (klvn - 273.15).toFixed(1);
    return c;
  };

  // farenhite
  const changeToF = (klvn) => {
    const f = ((klvn - 273.15) * (9 / 5) + 32).toFixed(1);
    return f;
  };

  // 1 hPa = 0.000987 atm
  const changeToAtm = (hPa) => {
    const atm = Number(hPa) * 0.000987;
    return atm.toFixed(1);
  };

  // const Refresh = () => {
  //   setData(null);
  //   CALL_API();
  // };

  const setIcon = () => {
    const iconCode = data && data.weather[0].icon;
    // icon url
    const iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
    return iconUrl;
  };

  // handle city edit
  const handleCityText = (e) => {
    // console.log(e.target.value);
    setIsError(false);
    setIsLoading(false);
    setQ(e.target.value);
  };
  // change city
  const changeCity = () => {
    // console.log(q);
    if (q.length > 1) {
      setData();
      setIsError(false);
      setIsLoading(true);
      CALL_API();
    } else {
      setIsError(true);
    }
  };

  // call api
  const CALL_API = () => {
    fetch(API_URI)
      .then((response) => response.json())
      .then((data) => {
        // console.log("res data ", data);
        if (data.cod === 200) {
          setData(data);
          setIsShowEdit(true);
          setIsLoading(false);
          const date = new Date().toLocaleDateString();
          const time = new Date().toLocaleTimeString();
          setCurrentDateTime({ date, time });
        } else {
          setIsShowEdit(true);
          setIsLoading(false);
          setIsError(true);
        }
      })
      .catch((err) => {
        setIsShowEdit(true);
        setIsLoading(false);
        setIsError(true);
      });
  };

  // COMPONENTS

  const navbar = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{backgroundColor: "#fff"}}>
        <h3 className="text-center m-auto" style={{fontWeight: "800"}}>
         <img style={{height: 50 , paddingRight : 20}} src="https://purepng.com/public/uploads/large/purepng.com-weather-iconsymbolsiconsapple-iosiosios-8-iconsios-8-721522596142qx4ep.png" />
          WEATHER APP
        </h3>
      </nav>
    );
  };

  const NoDataFound = () => {
    return (
      <div className={("row", css(styles.bounce))} style={{ marginTop: 35 }}>
        <div className="col text-center">
          {q.length < 1 ? (
            <h5 className="text-danger">Please enter your city or place!</h5>
          ) : (
            <h5 className="text-danger">
              No data found about <strong>{q}</strong>!
            </h5>
          )}
        </div>
      </div>
    );
  };

  //  loadng
  const Loading = () => {
    return (
      <div className="row">
        <div className="col text-center ">
          <ReactLoading type="bars" color="#f38ad" className="m-auto pt-5" />
        </div>
      </div>
    );
  };

  const searchCity = () => {
    return (
      <div className={("row", css(styles.bounce))}>
        <div className="col-lg-8 col-md-9 m-auto">
          <div className="card mt-2 ">
            <div className="card-body mt-2 pt-1 text-center">
              <h5>
                <b>Search Your City Here</b>
              </h5>
              <div
                className="row px-4 pt-2 m-auto"
                style={{ justifyContent: "center" }}
              >
                <div className="col-lg-9 col-md-9 col-10">
                  <div className="form-group m-auto">
                    <input
                      className="form-control "
                      type="text"
                      placeholder="Enter place.."
                      id="inputLarge"
                      value={q}
                      onChange={(e) => {
                        handleCityText(e);
                      }}
                    />
                  </div>
                </div>
                <div className="col-1 px-0">
                  <button
                    className="btn btn-primary float-left"
                    onClick={() => {
                      changeCity();
                    }}
                  >
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const result = () => {
    return (
      <div>
        <div className={("row", css(styles.bounceLate))}>
          <div className="col-lg-8 col-md-9 m-auto">
            <div className="card mt-2 ">
              <div className="card-body mt-2 pb-1 pt-1 text-center">
                {/*  */}
                <div className={("row", css(styles.bounce))}>
                  <div className="col text-center">
                    <h4>
                      <b>
                        {data.name},{data.sys.country}
                      </b>{" "}
                    </h4>
                  </div>
                  <div className="col text-center ">
                    <h5 className="text-secondary mb-0">
                      {CurrentDateTime.date} || {CurrentDateTime.time}
                    </h5>
                  </div>
                </div>
                {/*  */}
                <div className="row">
                  <div className="col ">
                    <h4 className="mb-0">
                      <img src={setIcon()} />
                      <b>{data.weather[0].description}</b>
                    </h4>
                  </div>
                </div>
                {/*  */}
                <div className="row  " style={{ justifyContent: "center" }}>
                  <div className="col">
                    <h2
                      className={(css(styles.bounceLate2), "mb-0")}
                      style={{ fontSize: 56, fontWeight: "800" }}
                    >
                      {unit === "C"
                        ? changeToC(data.main.temp)
                        : changeToF(data.main.temp)}
                      &deg;{unit}
                    </h2>
                    {/*  */}
                    <div
                      className="btn-group btn-group-toggle"
                      data-toggle="buttons"
                    >
                      <label
                        className={
                          unit === "C"
                            ? "btn btn-outline-primary active"
                            : "btn btn-outline-primar"
                        }
                        onClick={() => {
                          setUnit("C");
                        }}
                      >
                        <input
                          type="radio"
                          name="options"
                          id="option1"
                          autoComplete="off"
                        />
                        &deg;C
                      </label>
                      <label
                        className={
                          unit === "F"
                            ? "btn btn-outline-primary active"
                            : "btn btn-outline-primar"
                        }
                        onClick={() => {
                          setUnit("F");
                        }}
                      >
                        <input
                          type="radio"
                          name="options"
                          id="option2"
                          autoComplete="off"
                        />
                        &deg;F
                      </label>
                    </div>
                    {/*  */}
                  </div>
                </div>
                {/*  */}
                <div className="row">
                  <div className="col text-center">
                    <h5 className="mb-0">
                      Min:{" "}
                      {unit === "C"
                        ? changeToC(data.main.temp_min)
                        : changeToF(data.main.temp_min)}
                      &deg;{unit}
                    </h5>
                  </div>
                  <div className="col text-center ">
                    <h5 className=" mb-0">
                      Max:{" "}
                      {unit === "C"
                        ? changeToC(data.main.temp_max)
                        : changeToF(data.main.temp_min)}
                      &deg;{unit}
                    </h5>
                  </div>
                </div>
                {/*  */}
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className={("row", css(styles.bounceLate2))}>
          <div className="">
            <div className="col-lg-8 col-md-9 m-auto">
              <div className="card mt-2 ">
                <div className="card-body py-1 ">
                  {/* sunrise */}
                  <div className={"row"}>
                    <div className="col">
                      <h4>Sunrise</h4>
                    </div>
                    <div className="col text-right ">
                      <h4 className="text-secondary">
                        {realTime(data.sys.sunrise)}
                      </h4>
                    </div>
                  </div>
                  {/*  */}
                  {/* sunrise */}
                  <div className={"row"}>
                    <div className="col">
                      <h4>Sunset</h4>
                    </div>
                    <div className="col text-right ">
                      <h4 className="text-secondary">
                        {realTime(data.sys.sunset)}
                      </h4>
                    </div>
                  </div>
                  {/*  */}
                  {/* cloud */}
                  <div className={"row"}>
                    <div className="col">
                      <h4>Cloud</h4>
                    </div>
                    <div className="col text-right ">
                      <h4 className="text-secondary">{data.clouds.all}%</h4>
                    </div>
                  </div>
                  {/*  */}
                  <div className={"row"}>
                    <div className="col">
                      <h4>Wind</h4>
                    </div>
                    <div className="col text-right ">
                      <h4 className="text-secondary">{data.wind.speed} m/s</h4>
                    </div>
                  </div>
                  {/*  */}
                  <div className={"row"}>
                    <div className="col">
                      <h4>Humidity</h4>
                    </div>
                    <div className="col text-right ">
                      <h4 className="text-secondary">{data.main.humidity} %</h4>
                    </div>
                  </div>
                  {/*  */}
                  <div className={"row"}>
                    <div className="col">
                      <h4>Pressure</h4>
                    </div>
                    <div className="col text-right ">
                      <h4 className="text-secondary">
                        {changeToAtm(data.main.pressure)} atm
                      </h4>
                    </div>
                  </div>
                  {/*  */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
    );
  };

  // useEffect(() => {
  //   CALL_API();
  // }, []);

  /////////////////////////////////////////////////////////////////
  return (
    <div className="">
      {navbar()}
      {isShowEdit && searchCity()}
      {isLoading && Loading()}
      {isError && NoDataFound()}
      {data && result()}
    </div>
  );
}

/////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  bounce: {
    animationName: fadeInDown,
    animationDuration: "0.6s",
  },
  bounceLate: {
    animationName: fadeInDown,
    animationDuration: "1s",
  },
  bounceLate2: {
    animationName: fadeInDown,
    animationDuration: "1.2s",
  },
});

export default App;
