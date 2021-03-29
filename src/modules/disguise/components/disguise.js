import React from 'react';
import * as api from '../../../servces/api-client.js';
const str = `
function bSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len-1; i++) {
      for (var j = 0; j < len - 1 - i; j++) {
           // 相邻元素两两对比，元素交换，大的元素交换到后面
          if (arr[j] > arr[j + 1]) {
              var temp = arr[j];
              arr[j] = arr[j+1];
              arr[j+1] = temp;
          }
      }
    }
    return arr;
  }
  
  //举个数组
  myArr = [20,18,27,19,35];
  //使用函数
  bSort(myArr)
  function jsQuickSort(array) {
    if (array.length <= 1) {
        return array;
    }
    const pivotIndex = Math.floor(array.length / 2);
    const pivot = array.splice(pivotIndex, 1)[0];  //从数组中取出我们的"基准"元素
    const left = [], right = [];
    array.forEach(item => {
        if (item < pivot) {  //left 存放比 pivot 小的元素
            left.push(item); 
        } else {  //right 存放大于或等于 pivot 的元素
            right.push(item);
        }
    });
    //至此，我们将数组分成了left和right两个部分
    return jsQuickSort(left).concat(pivot, jsQuickSort(right));  //分而治之
}

const arr = [98, 42, 25, 54, 15, 3, 25, 72, 41, 10, 121];
console.log(jsQuickSort(arr));  //输出：[ 3, 10, 15, 25, 25, 41, 42, 54, 72, 98, 121 ]
`
export default class Disguise extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            code: ''
        }
    }
    componentDidMount() {
        this.setState({
            code: this.props.match.params.code
        })
        this.fetchMarket();
    }
    async fetchMarket() {
        try {
            let result = (await api.fetchMarket(this.state.code));
            let arr = result.split(',');
            let up = (arr[3] - arr[2]) / arr[2] * 100;
            document.title = `${arr[3]}  ${up.toFixed(2)}%`;
            setTimeout(()=>this.fetchMarket(), 3000);
        } catch (error) {
            setTimeout(()=>this.fetchMarket(), 3000);
            console.log(error)
        }
    }
    render() {
        return (
            <div>
                <pre>
                    {str}
                </pre>
            </div>
        )
    }
}
