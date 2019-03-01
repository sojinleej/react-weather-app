import React from "react";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";


class Chart extends React.Component {
    state = {
        dataLine: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    // label: "Temperature",
                    // fill: true,
                    // backgroundColor: "rgba(75,192,192,0.4)",
                    // borderColor: "rgba(75,192,192,1)",
                    // borderDash: [],
                    // borderDashOffset: 0.0,
                    // pointBorderWidth: 1,
                    // pointHoverRadius: 5,
                    // pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    // pointHoverBorderColor: "rgba(220,220,220,1)",
                    // pointHoverBorderWidth: 2,
                    // pointRadius: 1,
                    // pointHitRadius: 10,
                    // data: [65, 59, 80, 81, 56, 55, 40]
                    //   borderJoinStyle: "miter",
                    //   pointBorderColor: "rgba(75,192,192,1)",
                    //   pointBackgroundColor: "#fff",
                    //   borderCapStyle: "butt",
                    //   lineTension: 0.1,
                }
            ]
        }
    }

    render() {
        return (
            <MDBContainer>
                {/* <h3 className="mt-5">Line chart</h3> */}
                <Line data={this.state.dataLine} options={{ responsive: true }} />
            </MDBContainer>
        );
    }
}

export default Chart;