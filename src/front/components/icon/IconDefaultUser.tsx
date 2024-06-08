import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"

const IconDefaultUser = ({ width, height, iconSize }: {width: string, height: string, iconSize: string}) => {
    
    return (
        <div className='icon-default-user'>
            <div className='icon-wrapper' style={{width: width, height: height}}>
                <FontAwesomeIcon icon={faUser} className="icon" color="#CAC8C8" style={{fontSize: iconSize}} />
            </div>
        </div>
    )
}

export default IconDefaultUser