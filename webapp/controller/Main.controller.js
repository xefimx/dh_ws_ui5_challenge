sap.ui.define(
  [
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    'sap/ui/core/Fragment',
  ],
  (Controller, JSONModel, Fragment) => {
    'use strict';

    return Controller.extend('dh.fs.wschallenge.controller.Main', {
      onInit() {
        this.oModel = new JSONModel({
          items: [],
        });
        this.getView().setModel(this.oModel);
        this.setModelData();
      },

      async setModelData() {
        //Instead of hardcoded object, data should be fetched from https://api.imgflip.com/get_memes
        const data = [
          {
            name: 'Chill guy',
            url: 'https://i.imgflip.com/9au02y.jpg',
            captions: 29750,
          },
        ];
        this.oModel.setProperty('/items', data);

        //!!!extra challenge to add new column to Main.view.xml and display the position of the meme in the list!!!
      },

      async openPreview(oEvent) {
        const sContextPath = oEvent.getSource().getBindingContext().getPath();

        if (!this._oPreviewDialog) {
          this._oPreviewDialog = await Fragment.load({
            name: 'dh.fs.wschallenge.view.fragments.ImagePreviewDialog',
            controller: this,
          });
          this.getView().addDependent(this._oPreviewDialog);
        }

        this._oPreviewDialog.bindElement(sContextPath);
        this._oPreviewDialog.open();
      },

      onDialogClose() {
        this._oPreviewDialog.close();
      },
    });
  }
);
