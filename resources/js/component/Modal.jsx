// resources/js/components/Modal.jsx
import React from "react";
import {
    Modal as MuiModal,
    Box,
    Typography,
    IconButton,
    Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Style untuk modal box berdasarkan size
const getModalStyle = (size) => {
    let width;
    switch (size) {
        case "sm":
            width = 400;
            break;
        case "lg":
            width = 800;
            break;
        case "xl":
            width = 1200;
            break;
        default:
            width = 600; // default size
    }

    return {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: width,
        maxWidth: "90vw",
        maxHeight: "90vh",
        minHeight: "70vh",
        bgcolor: "background.paper",
        boxShadow: 24,
        borderRadius: 1,
        outline: "none",
        overflowY: "auto",
    };
};

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    size = "lg",
}) {
    const modalStyle = getModalStyle(size);

    return (
        <MuiModal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Paper sx={modalStyle}>
                {/* Modal Header */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 2,
                        borderBottom: 1,
                        borderColor: "divider",
                    }}
                >
                    <Typography
                        id="modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ fontWeight: 600 }}
                    >
                        {title}
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        size="small"
                        sx={{
                            color: "text.secondary",
                            "&:hover": {
                                bgcolor: "action.hover",
                            },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box sx={{ p: 3 }}>{children}</Box>
            </Paper>
        </MuiModal>
    );
}
