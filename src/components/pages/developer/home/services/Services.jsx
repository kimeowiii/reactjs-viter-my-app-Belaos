import React from "react";
import CardServices from "../../../../partials/CardServices";
import useQueryData from "../../../../custom-hooks/useQueryData";
import { apiVersion } from "../../../../helpers/function-generals";

const Services = () => {
  const {
    isLoading,
    isFetching,
    error,
    data: dataServices,
  } = useQueryData(
    `${apiVersion}/controllers/developer/web-services/web-services.php`,
    "get",
    "web-services"
  );
  return (
    <>
      {/* Services */}
      <section id="services" className="bg-gray-50 py-12 md:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="title">Our Web Services</h2>
            <p>
              Professional solutions tailored to boost your online presence.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {dataServices?.data.map((item, key) => {
              return (
                <React.Fragment key={key}>
                  <CardServices item={item} />
                </React.Fragment>
              );
            })}

            {/* <CardServices
              img={"/images/card-icon-web-development.webp"}
              alt={"Web development image"}
              title={"Web Development"}
              description={
                "Custom websites built with modern frameworks like Next.js and React for optimal performance."
              }
              link={"View Packages"}
            />

            <CardServices
              img={"/images/card-icon-ui-ux-design.webp"}
              alt={"UI/UX Design image"}
              title={"UI/UX Design"}
              description={
                "Beautiful interfaces designed to convert visitors with strategic user experience flows."
              }
              link={"See Portfolio"}
            />

            <CardServices
              img={"/images/card-icon-seo-optimization.webp"}
              alt={"SEO Optimization image"}
              title={"SEO Optimization"}
              description={
                "Increase your visibility on search engines with our data-driven SEO strategies."
              }
              link={"Get Audit"}
            /> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
