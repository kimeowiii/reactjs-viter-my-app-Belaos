import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { queryData } from "../../../../custom-hooks/queryData";
import * as Yup from "yup";
import ModalWrapper from "../../../../partials/modal/ModalWrapper";
import { FaTimes } from "react-icons/fa";
import { Form, Formik } from "formik";
import { InputText, InputTextArea } from "../../../../helpers/FormInputs";
import { apiVersion } from "../../../../helpers/function-generals";

const ModalAddTestimonials = ({ setIsModal }) => {
  const [animate, setAnimate] = React.useState("translate-x-full");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        `${apiVersion}/controllers/developer/testimonials/testimonials.php`,
        "post", //CREATE
        values
      ),
    onSuccess: (data) => {
      // //validate reading
      queryClient.invalidateQueries({ queryKey: ["testimonials"] }); // give id for refetching data.

      if (data.success) {
        alert("Succcessfully Created.");
      } else {
        alert(data.error);
      }
    },
  });

  const handleClose = () => {
    if (mutation.isPending) return; // don't close while query is ongoing
    setAnimate("translate-x-full"); //animate close of modal
    setTimeout(() => {
      // delay of closing
      setIsModal(false); //close upon animation exit
    }, 200);
  };

  const initVal = {
    testimonials_image: "",
    testimonials_description: "",
    testimonials_name: "",
    testimonials_position: "",
  };

  const yupSchema = Yup.object({
    testimonials_image: Yup.string().required("required"),
    testimonials_description: Yup.string().required("required"),
    testimonials_name: Yup.string().required("required"),
    testimonials_position: Yup.string().required("required"),
  });

  //UPON USING THIS MODAL AND ALL ELEMENT TAG ARE RENDERED, RUN THIS CODE
  React.useEffect(() => {
    setAnimate("");
  }, []); //[] is dependencies, if you have a value inside re-run the code inside

  return (
    <>
      <ModalWrapper className={`${animate}`} handleClose={handleClose}>
        <div className="modal_header relative mb-4">
          <h3 className="text-sm">Add Testimonials</h3>
          <button
            className="absolute  top-0.5 right-0"
            type="button"
            onClick={handleClose}
          >
            <FaTimes className="size-4" />
          </button>
        </div>

        <div className="modal_body overflow-y-auto overflow-x-hidden max-h-[calc(100dvh-40px)]">
          <Formik
            initialValues={initVal}
            validationSchema={yupSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              console.log(values);
              mutation.mutate(values);
            }}
          >
            {(props) => {
              return (
                <Form>
                  <div className="modal-overflow">
                    <div className="relative mt-3 mb-5">
                      <InputText
                        label="Image url"
                        name="testimonials_image"
                        type="text"
                        disabled={mutation.isPending}
                      />
                    </div>
                    <div className="relative mt-3 mb-5">
                      <InputTextArea
                        label="Description"
                        name="testimonials_description"
                        type="text"
                        disabled={mutation.isPending}
                      />
                    </div>
                    <div className="relative mt-3">
                      <InputText
                        label="Name"
                        name="testimonials_name"
                        type="text"
                        disabled={mutation.isPending}
                      />
                    </div>
                    <div className="relative mt-3">
                      <InputText
                        label="Position"
                        name="testimonials_position"
                        type="text"
                        disabled={mutation.isPending}
                      />
                    </div>
                  </div>
                  <div className="modal__action flex justify-end absolute bottom-0 w-full mt-6 mb-4 gap-2 left-0 px-6">
                    <button
                      type="submit"
                      disabled={mutation.isPending}
                      className="btn-modal-submit"
                    >
                      {mutation.isPending ? "Loading..." : "Add"}
                    </button>
                    <button
                      type="reset"
                      disabled={mutation.isPending}
                      className="btn-modal-cancel"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </ModalWrapper>
    </>
  );
};

export default ModalAddTestimonials;
