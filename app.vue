<template>

<div>

 <h1>Monty Hall Problem Simulation</h1>
<p class="author">John Dews-Flick 5/11/2020</p>


<h2>Problem Setup</h2>

<p>

Named after the host Monty Hall. The game is comprised of a set of three doors, one of which has a car behind it. The goal of the player is to select the door in which the car is behind, winning the vehicle. First, the participant selects one of the three doors at complete random, then Monty will reveal one of the other two doors not selected. An important note is that Monty will never select the door with the car behind it. After Monty reveals the additional door the participant has the choice: keep the door they selected, or switch to the door Monty left closed.
</p>

<h2>Procedure</h2>

<p>

The simulation is carried out within the browser using the javascript language. A function creates a randomized door setup, selects an initial guess, changes the guess if desired, and returns if the car was revealed. This was run one million times for both the case where the participant switches and keeps there initial guess. 

</p>


<h2>Simulation Results</h2>

  <chartist
    ratio="ct-major-second"
    type="Bar"
    :data="barData"
    :options="barOptions" style="height: 300px">
    </chartist>

    <chartist
    ratio="ct-major-second"
    type="Line"
    :data="chartData"
    :options="chartOptions" style="height: 500px">
    </chartist>

    <h2>Conclusion</h2>


<p>

Your greatest odds to win is by switching your choice after Monte opens the door. Theoretically, it has been proven you have a 1/3 chance if you don't switch and a 2/3 chance if you do the switch. The theoretical expectations closely parallel the simulation results inregards to the exected 66% win rate [1].

</p>

    <h2>Refrences</h2>

    <p>[1] M. Mitzenmacher, “The Monty Hall Problem: A Study,” MIT, Jun. 2005.</p>


</div>





</template>

<script>

import Monty from './monty';

import chartAxis from "chartist-plugin-axistitle/dist/chartist-plugin-axistitle.min.js"

console.log(chartAxis);

function Delay(t){
    return new Promise(function(f){
        setTimeout(x=>{ f() }, t)
    })
}

function linspace(a, b, n) {
    if (typeof n === "undefined") n = Math.max(Math.round(b - a) + 1, 1);
    if (n < 2) {
        return n === 1 ? [a] : [];
    }
    var i, ret = Array(n);
    n--;
    for (i = n; i >= 0; i--) {
        ret[i] = (i * b + (n - i) * a) / n;
    }
    return ret;
}

export default {

    data() {
        return {
            chartData: {
                labels: [],
                series: [
                    [],
                    []
                ]
            },
            barOptions: {
                lineSmooth: false,
                height: 300
            },
            barData: {
 labels: ['Switch Guess', 'Keep Guess'],
  series: [
    [1, 2]
  ]
            },
            chartOptions: {
                lineSmooth: false,
                height: 500,
                onlyInteger: true,
                chartPadding: {
                    top: 20,
                    right: 0,
                    bottom: 30,
                    left: 45
                },
                plugins: [
                    chartAxis({
                        axisX: {
                            axisTitle: 'Trails',
                            axisClass: 'ct-axis-title',
                            textAnchor: 'middle',
                            offset: {
                                x: 0,
                                y: 40
                            }
                        },
                        axisY: {
                            axisTitle: 'Wins',
                            axisClass: 'ct-axis-title',
                            offset: {
                                x: 0,
                                y: 20
                            },
                            textAnchor: 'middle',
                            flipTitle: true
                        }
                    })
                ]
            }
        }
    },
    mounted() {
        this.run(1000000);
    },
    methods: {
        async run(times) {
            let n = 0;


            let changeWins = 0;
            let stayWins = 0;

            let points = linspace(100, times, 20).map(Math.floor)
            console.log(points);

            while (n < times) {
                n++;
                if (Monty(true)) changeWins++;
                if (Monty(false)) stayWins++;
                if (points.includes(n)) {
                    this.chartData.labels.push((n/1000).toFixed()+'k');
                    this.chartData.series[0].push(changeWins);
                    this.chartData.series[1].push(stayWins);
                    this.barData.series = [[changeWins/n, stayWins/n]];
                    await Delay(500)
                }
                
            }

        }
    }


}

</script>

<style>
.ct-chart-bar .ct-bar {
    stroke-width: 80px !important
}

.ct-label{
    color: black !important;
}

</style>
