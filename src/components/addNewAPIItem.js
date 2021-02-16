import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { TextField, Switch, FormControlLabel } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { SettingsInputAntennaTwoTone } from "@material-ui/icons";
import { Toaster } from "./toastMessage";
import { API_ACTION_SAVE_ITEM, SEVERITIES } from "../AppConstants";
import axios from "axios";

export const AddItemPop = (params) => {
  // Form params
  const [apiTitle, setApiTitle] = useState("");
  const [apiSubTitle, setApiSubTitle] = useState("");
  const [publisher, setPublisher] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [inputModel, setInputModel] = useState("");
  const [outputModel, setOutputModel] = useState("");
  const [isPaid, setisPaid] = useState(false);

  // Toast Message params
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeveriety, setToastSeveriety] = useState("info");
  const [showToast, setShowToast] = useState(false);

  // Get new item from client to backend and raise a toast
  const saveItems = () => {
    const data = {
      uniqueTitle: apiTitle,
      subTitle: apiSubTitle,
      publisher: publisher,
      description: description,
      url: url,
      sourceUrl: sourceUrl,
      inputModel: inputModel,
      outputModel: outputModel,
      isPaid: isPaid,
    };

    axios
      .post(API_ACTION_SAVE_ITEM, data)
      .then(function (response) {
        raiseToast(apiTitle + " added successfully", "info");
      })
      .catch(function (error) {
        raiseToast(apiTitle + " added successfully", "error");
      });

    params.onClose();
  };

  const raiseToast = (m, s) => {
    setToastMessage(m);
    if (SEVERITIES.includes(s)) setToastSeveriety(s);
    setShowToast(true);
  };
  const closeToast = () => {
    setShowToast(false);
  };

  return (
    <>
      <div>
        <Dialog
          open={params.pop}
          onClose={params.onClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add API</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add a new API. Please make sure that you add all the relevant details to
              enable better search results.
            </DialogContentText>
            <TextField
              margin="dense"
              id="name"
              label="API Title"
              type="text"
              onChange={(e) => setApiTitle(e.target.value)}
              fullWidth
            />
            <TextField
              margin="dense"
              id="name"
              label="API Subtitle"
              type="text"
              onChange={(e) => setApiSubTitle(e.target.value)}
              fullWidth
            />
            <TextField
              margin="dense"
              id="name"
              label="Publisher name"
              type="text"
              onChange={(e) => setPublisher(e.target.value)}
              fullWidth
            />
            <TextField
              margin="dense"
              id="name"
              label="Description"
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
            />
            <TextField
              margin="dense"
              id="name"
              label="API Endpoint(URL)"
              type="text"
              onChange={(e) => setUrl(e.target.value)}
              fullWidth
            />
            <TextField
              margin="dense"
              id="name"
              label="Source url(Github/GitLab)"
              type="text"
              onChange={(e) => setSourceUrl(e.target.value)}
              fullWidth
            />
            <TextField
              margin="dense"
              id="name"
              label="Input Model (API Input Parameters or Input schema)"
              type="text"
              onChange={(e) => setInputModel(e.target.value)}
              fullWidth
            />
            <TextField
              margin="dense"
              id="name"
              label="Output Model (Example output of API or output schema)"
              type="text"
              onChange={(e) => setOutputModel(e.target.value)}
              fullWidth
            />
            <FormControlLabel
              control={
                <Switch
                  checked={isPaid}
                  onChange={(e) => setisPaid(e.target.checked)}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Paid"
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={() => params.onClose()} color="primary">
              Cancel
            </Button>
            <Button onClick={() => saveItems()} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Toaster
        pop={showToast}
        onClose={closeToast}
        severity="info"
        message={toastMessage}
      ></Toaster>
    </>
  );
};
