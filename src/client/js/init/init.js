import 'index.html'
import 'animate.css'
import 'vendor/font-awesome/css/font-awesome.min.css'
//import 'sass/main.scss'
import Elm from 'elm/Main.elm'

const mountNode = document.getElementById('app')
const app = Elm.Main.embed(mountNode)
