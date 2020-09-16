import { LightningElement } from "lwc";
import submitResult from "@salesforce/apex/TS_integrationController.postResults";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import CUSTOM_CSS from "@salesforce/resourceUrl/textareaclass";
import { loadStyle } from "lightning/platformResourceLoader";

export default class TrueScreenIntegrationTest extends LightningElement {
  loaded = true;
  sampleResponse =
    "<BI_RESPONSE>\n<UserNm></UserNm>\n<UserPwd></UserPwd>\n<RequestId>a5p0t00000050JsAAI</RequestId>\n<TestType>Additional Drug Screening</TestType>\n<ClientCaseId>7162612</ClientCaseId>\n<StatusCd>On_Hold</StatusCd>\n<PassReviewStatusCd>PENDING</PassReviewStatusCd>\n<RedirectLink>https://www.mytruescreen.com/signin/vplus.jsp?cid=7162612</RedirectLink>\n<StudentId>a033800000S5065AAB</StudentId>\n</BI_RESPONSE>";
  connectedCallback() {
    loadStyle(this, CUSTOM_CSS).then(() => {});
  }
  handleClick(event) {
    this.loaded = false;
    var inp = this.template.querySelectorAll("lightning-textarea");
    let body = "";
    inp.forEach(function (element) {
      if (element.name == "input1") body = element.value;
    }, this);
    console.log("body: " + body);
    submitResult({ requestbody: body })
      .then((result) => {
        this.loaded = true;
        console.log(result);
        this.showToast("Success: ", result, "success");
      })
      .catch((error) => {
        this.loaded = true;
        console.log(error);
        let errorMessage;
        if (error.body.message) {
          errorMessage = error.body.message;
        }
        this.showToast("Error: ", errorMessage, "error");
      });
  }

  showToast(title, message, variant) {
    const event = new ShowToastEvent({
      title: title,
      message: message,
      variant: variant
    });
    this.dispatchEvent(event);
  }
}
