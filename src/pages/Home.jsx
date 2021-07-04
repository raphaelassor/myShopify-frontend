import { Link } from 'react-router-dom'
import logo from '../logo.svg'
import { ReactComponent as LogoSvg } from '../logo.svg'

export function Home() {
  // const logoUrl = 'logo.svg'
  return (
    <div>
      <h1>Home!</h1>
      {/* <img src={require('../' + logo).default} alt="" /> */}
      <img src={logo} alt="" />
      <LogoSvg />

      <Link to='/cars'>Cars</Link>
    </div>
  )
}
