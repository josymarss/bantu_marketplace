import { Doughnut } from 'react-chartjs-2';
import styles from './chart.module.css';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

 
export function CircularBar( props ){
      let appName = [];
      let appData = [];
      for(let i=0; i< props.data.length; i++){
            appName.push(props.data[i].name);
            appData.push(props.data[i].stars.likes);
      }
      const dataCircular = {
            labels: appName,
            datasets: [
              {
                label: 'Dados dos aplicativos do sistema',
                data: appData,
                backgroundColor: ['rgba(153, 102, 255, 0.2)','rgba(255, 99, 132, 0.2)'],
                borderColor:'rgba(153, 102, 255, 1)',
                borderWidth: 1,
              },
            ],
      };
      
      return(
            <div className={styles.chartContainer}>
                  <Chart type={props.type} data={dataCircular}/>
             </div>
      );
}

export function VerticalBar( props ){
      let dataArray = [];

      for(let j=0; j<props.data.length; j++){
            dataArray.push(props.data[j].acepetedApp.name);
      }

      const data = {
            labels: dataArray,
            datasets: [
              {
                label: 'Dados das negociações aceites do sistema',
                data:'',
                backgroundColor: ['rgba(153, 102, 255, 0.2)','rgba(255, 99, 132, 0.2)'],
                borderColor:'rgba(153, 102, 255, 1)',
                borderWidth: 1,
              },
            ],
      };
      return(
            <div className={styles.chartContainer}>
                   <Chart type={props.type} data={data}/>
            </div>
      );
}
