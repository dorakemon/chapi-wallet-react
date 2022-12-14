import { Button, Chip, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokaiSublime } from "react-syntax-highlighter/dist/cjs/styles/hljs";

import { VCType } from "@/domain/models";
import { useDownloadFile } from "@/hooks";

import { VerifyChipStyle } from "../constants/verify-status";
import { useVerifyUnboundVc } from "../hooks/useVerifyUnboundVc";

type Props = {
  unboundVc: VCType;
  onCloseBtnClicked: () => void;
};

export const VerifyUnboundVc: React.FC<Props> = (props) => {
  const { t } = useTranslation("translation", {
    keyPrefix: "features.unboundVc"
  });

  const { verifyStatus, verifyVcHandler } = useVerifyUnboundVc();
  const { downloadFile } = useDownloadFile();

  const unboundVcJson = JSON.stringify(props.unboundVc, null, 2);

  const downloadHandler = () => {
    downloadFile({
      filename: "VC.json",
      content: JSON.stringify(props.unboundVc, null, 2),
      fileType: "text/json"
    });
  };

  return (
    <Grid
      justifyContent="center"
      alignItems="center"
      direction="column"
      my={2}
      container
    >
      <Grid item>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <Typography variant="subtitle1">Verify Unbound VC</Typography>
          </Grid>
          <Grid item>
            <Chip
              label={t(VerifyChipStyle[verifyStatus].text)}
              color={VerifyChipStyle[verifyStatus].color}
              variant={VerifyChipStyle[verifyStatus].variant}
              onClick={() => verifyVcHandler(props.unboundVc)}
            />
          </Grid>
        </Grid>
        <SyntaxHighlighter
          language="json"
          style={monokaiSublime}
          customStyle={{ maxWidth: "90vw" }}
        >
          {unboundVcJson}
        </SyntaxHighlighter>
      </Grid>
      <Grid item>
        <Grid container justifyContent="center" spacing={3}>
          <Grid item>
            <Button
              variant="contained"
              onClick={downloadHandler}
              disabled={verifyStatus !== "valid"}
            >
              Download
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={props.onCloseBtnClicked}>
              Close
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
