import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
const IconChevronDown = ({ props }: { props: any }) => {
  return (
    <FontAwesomeIcon icon={faChevronDown} className="icon-chevron-down" color="#B4B3B3" {...props} />
  )
}

export default IconChevronDown