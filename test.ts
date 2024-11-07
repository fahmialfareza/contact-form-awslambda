import axios from "axios";
// axios.post('https://www.google.com/recaptcha/api/siteverify', null, params = {
//         secret: '6Lf2DrYUAAAAANf1evKk0Wky9quPCkWQ2EhHEonr',
//         response: '03AOLTBLShaJNigU5li2q3dN9-cZmxd0huq7NHvI-MSFyPExmHyfkpb3I_Gn_e88Y0XwwiBqtWPAOQZkeO1n5cUQAdodFe-rRi4v0qGEsCeKWCnokj8seYAsDigaEZkTXQbmmCmkKxoQ_sn-mlq64XR2C16zBWPkKDGCbl9QiMsm8VG0XusEkDo-KHhyVf_3iy3kUxGuJJsdhRYVLAhoLFdANXUkeN0ac0uoToLSfnTz7m-X1EjWVPB1d83aM_qro9eIJy_tVW2-PTPZTs51vDJp2FhjSWzZTxcnPFvbMDiBe3KpuuFxi_FJsRHyQDsmdbC4pnj8fuN5U3BYYL_GwGesJevO53JSaYArXpsdkgo2-4uy6soy7a1IlBOoB8yGMfotiDJl8cYYj78dvSbkMGZ3-T7Jmco6G7RbjToUEARe-y15qcaucdcoyD97RFRAfIzMHCWHbul7AMahXjiSHBj5mdGLOSiX_qx2PtEVnmSy6gIm47Vk8msGk'
//     })
//     .then(function (response) {
//         console.log(response.data);
//     })
(async () => {
  let verifyResult = await axios({
    method: "post",
    url: "https://www.google.com/recaptcha/api/siteverify",
    params: {
      secret: "6Lf2DrYUAAAAANf1evKk0Wky9quPCkWQ2EhHEonr",
      response:
        "03AOLTBLShaJNigU5li2q3dN9-cZmxd0huq7NHvI-MSFyPExmHyfkpb3I_Gn_e88Y0XwwiBqtWPAOQZkeO1n5cUQAdodFe-rRi4v0qGEsCeKWCnokj8seYAsDigaEZkTXQbmmCmkKxoQ_sn-mlq64XR2C16zBWPkKDGCbl9QiMsm8VG0XusEkDo-KHhyVf_3iy3kUxGuJJsdhRYVLAhoLFdANXUkeN0ac0uoToLSfnTz7m-X1EjWVPB1d83aM_qro9eIJy_tVW2-PTPZTs51vDJp2FhjSWzZTxcnPFvbMDiBe3KpuuFxi_FJsRHyQDsmdbC4pnj8fuN5U3BYYL_GwGesJevO53JSaYArXpsdkgo2-4uy6soy7a1IlBOoB8yGMfotiDJl8cYYj78dvSbkMGZ3-T7Jmco6G7RbjToUEARe-y15qcaucdcoyD97RFRAfIzMHCWHbul7AMahXjiSHBj5mdGLOSiX_qx2PtEVnmSy6gIm47Vk8msGk",
    },
  });

  console.log(verifyResult.data);
})();
