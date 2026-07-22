import './index.css'

const Loader = ({ text = "Loading..." }) => (
    <div className='loader-container'>
        <div className='loader-spinner'>
            <div className='loader-spinner-inner' />
        </div>
        <p className='loader-text'>{text}</p>
    </div>
)

export default Loader
