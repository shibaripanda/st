import { Button, Modal } from "@mantine/core"

export const ShowModal = ({opened, showModal, alertMessage}: any) => {
    return (
        <Modal opened={opened} onClose={showModal.close} title={alertMessage} withCloseButton={false}>
            <Button
            onClick={showModal.close}
            >
            Ok
            </Button>
        </Modal>
    )
}