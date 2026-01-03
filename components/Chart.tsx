import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0"
    />
    <title>Lightweight Charts™ Customization Tutorial</title>
    <!-- Adding the standalone version of Lightweight charts -->
    <script
      type="text/javascript"
      src="https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js"
    ></script>
    <style>
      body {
        padding: 0;
        margin: 0;
      }
    </style>
  </head>

  <body>
    <div
      id="container"
      style="position: absolute; width: 96%; height: 100%"
    ></div>
        <script type="text/javascript">
          const chart = LightweightCharts.createChart(
            document.getElementById('container'),
            {
              layout: { background: { color: '#1A1A1A' }, textColor: '#DDD' },
              grid: { vertLines: { color: '#242424' }, horzLines: { color: '#242424' } },
            }
          );
        
          // const mainSeries = chart.addSeries(LightweightCharts.CandlestickSeries, {
          //   wickUpColor: 'rgb(54, 116, 217)',
          //   upColor: 'rgb(54, 116, 217)',
          //   wickDownColor: 'rgb(225, 50, 85)',
          //   downColor: 'rgb(225, 50, 85)',
          //   borderVisible: false,
          // });
        
          const areaSeries = chart.addSeries(LightweightCharts.AreaSeries, {
            lastValueVisible: true,
            crosshairMarkerVisible: true,
            lineColor: "rgb(5, 155, 255)", // make line visible
            topColor: "rgba(5, 155, 255,0.6)",
            bottomColor: "rgba(5, 155, 255, 0.1)",
          });
        
          document.addEventListener('message', function(event) {
            try {
              const newData = JSON.parse(event.data);
        
              // Set data for main candlestick
              // mainSeries.setData(newData);
        
              // Convert to line data for area series
              const lineData = newData.map(d => ({
                time: d.time,
                value: (d.open + d.close) / 2,
              }));
              areaSeries.setData(lineData);
            } catch(e) {
              console.error('Failed to parse chart data:', e);
            }
          });
        
          window.addEventListener("resize", () => {
            chart.resize(window.innerWidth, window.innerHeight);
          });
        </script>
  </body>
</html>`;

type ChartProp = {
    symbol: string;
};

export default function Chart({ symbol }: ChartProp) {
    const [data, setData] = useState<any[]>([]);
    const webviewRef = React.useRef<WebView>(null);

    useEffect(() => {
        fetch(`http://192.168.1.105:8085/api/stock/info/chart/${symbol}/7y`)
            .then(res => res.json())
            .then(json => {
                const formatted = json.data.map((d: any) => ({
                    time: d.date.split('T')[0],
                    open: d.open,
                    high: d.high,
                    low: d.low,
                    close: d.close,
                }));
                setData(formatted);
                // Send the new data to WebView
                webviewRef.current?.postMessage(JSON.stringify(formatted));
            })
            .catch(console.error);
    }, [symbol]);

    return (
        <View style={styles.container}>
            <WebView
                ref={webviewRef}
                source={{ html }}
                originWhitelist={['*']}
                javaScriptEnabled
                domStorageEnabled
                style={{ backgroundColor: '#1A1A1A', width: '96%'}}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        height: 300,
        width: Dimensions.get('window').width,
    },
});
