import { Component } from 'react';
import { Form, Modal, Input } from 'antd';
import * as newIndexService from '../../../services/newIndex';

import * as CommonUtil from '../../../utils/CommonUtil';

class TimingPrice extends Component {
  state = {
    price: ''
  }

  tick = () => {
    let symbol = CommonUtil.getSymbol(this.props.record.symbol, this.props.record.contract_type);
    newIndexService.merged(symbol)
      .then((data) => {
        if (data.status == 'ok') {
          this.setState({
            price: data.tick.close
          });
        }
      });
  }

  componentDidMount() {
    this.tick();
    // 定时器
    this.priceInterval = setInterval(() => {
        this.tick();
      }, 60000);
  }

  componentWillUnmount() {
    // 清除定时器
    clearInterval(this.priceInterval);
  }

  render() {
    return (
      <div>{this.state.price}</div>
    );
  }
}

export default TimingPrice;
