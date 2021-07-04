import { Component } from 'react'
import { carService } from '../services/car-service'

export class CarApp extends Component {
  state = {
    cars: []
  }
  componentDidMount() {
    carService.query().then(cars => {
      this.setState({ cars })
    })
  }

  render() {
    return (
      <div>
        {JSON.stringify(this.state.cars)}
      </div>
    )
  }
}
