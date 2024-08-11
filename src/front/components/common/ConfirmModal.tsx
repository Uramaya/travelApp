import { useCallback, useState, useRef, useEffect } from "react"
import { EventInfo, EventInfoKeys, UserInfo } from '@/types'
import '@/styles/mui/ConfirmModal.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark, faLocationPin, faClock, faLocationDot, faUsers, faAlignLeft, faCircleDot, faMapLocationDot, faEnvelope, faLightbulb, faTrashCan, faCopy, faPlus } from "@fortawesome/free-solid-svg-icons"
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const ConfirmModal = ({
  openConfirmModal,
  modalTitle,
  modalContent,
  saveBtnTitle,
  type,
  data,
  onSave,
  onCancel,
}: {
  openConfirmModal: boolean,
  modalTitle?: string,
  modalContent?: string,
  saveBtnTitle?: string,
  type?: string,
  data?: any,
  onSave: (data: any) => void,
  onCancel: () => void,
}) => {
  library.add(fas, fab)

  const onSaveClick = () => {
    onSave(data)
  }

  const onCancelClick = () => {
    onCancel()
  }

  const saveBtn = useCallback((): JSX.Element => {
    return <Button
      onClick={onSaveClick}
      className={`save-btn mui-customize ${type}`}
    >
      {saveBtnTitle || 'Ok'}
    </Button>
  }, [openConfirmModal])


  const cancelBtn = useCallback((): JSX.Element => {
    return <Button
      onClick={onCancelClick}
      className='cancel-btn mui-customize'
    >
      Cancel
    </Button>
  }, [openConfirmModal])


  if (openConfirmModal) return (
    <Dialog
        open={openConfirmModal}
        onClose={onCancelClick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="mui-customize confirm-modal"
      >
        <DialogTitle>
          {modalTitle || 'Are you sure?' }
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {modalContent || '' }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {saveBtn()}
          {cancelBtn()}
        </DialogActions>
      </Dialog>
  )
}

export default ConfirmModal