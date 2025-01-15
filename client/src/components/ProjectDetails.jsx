import React from 'react'

const ProjectDetails = () => {
  return (
    <section class="frmr-project-detail-main">
    <div class="fpd-cover-img-wrapper"><img src="/images/cabbage.jpg" loading="lazy" sizes="100vw" class="image"/></div>
    <div class="w-layout-blockcontainer fpd-other-part-container w-container">
      <h1 class="fpd-project-detail-heading">Cabbage </h1>
      <div class="fpd-basic-info">
        <div class="w-layout-hflex fpd-bi-flex">
          <div class="fpd-bi-info-item"><img src="/images/investing.png" loading="lazy" alt="" class="image-2"/>
            <div class="fpd-bi-divider"></div>
            <div class="fpd-bi-item-value-wrapper">
              <h4 class="fpd-bi-item-h4">Product</h4>
              <div class="fpd-bi-item-value">Cabbage</div>
            </div>
          </div>
          <div class="fpd-bi-info-item"><img src="/images/investing.png" loading="lazy" alt="" class="image-2"/>
            <div class="fpd-bi-divider"></div>
            <div class="fpd-bi-item-value-wrapper">
              <h4 class="fpd-bi-item-h4">Seedling</h4>
              <div class="fpd-bi-item-value">10000</div>
            </div>
          </div>
          <div class="fpd-bi-info-item"><img src="/images/investing.png" loading="lazy" alt="" class="image-2"/>
            <div class="fpd-bi-divider"></div>
            <div class="fpd-bi-item-value-wrapper">
              <h4 class="fpd-bi-item-h4">Land</h4>
              <div class="fpd-bi-item-value">5 Acr</div>
            </div>
          </div>
          <div class="fpd-bi-info-item"><img src="/images/investing.png" loading="lazy" alt="" class="image-2"/>
            <div class="fpd-bi-divider"></div>
            <div class="fpd-bi-item-value-wrapper">
              <h4 class="fpd-bi-item-h4">Starting Time</h4>
              <div class="fpd-bi-item-value">20 July, 2023</div>
            </div>
          </div>
        </div>
        <div class="w-layout-hflex fpd-total-calculations">
          <div class="fpd-calc-item">
            <div class="w-layout-hflex fpd-total-calc-flex"><img src="/images/investing.png" loading="lazy" alt="" class="fpd-total-calc-icons"/>
              <div class="fpd-total-calc-text">
                <h5 class="fpd-total-calc-h4">Total Expenses</h5>
                <h4 class="fpd-total-calc-h5">135,000 <span class="fpd-total-calc-h5-span"></span></h4>
              </div>
            </div>
          </div>
          <div class="fpd-calc-item">
            <div class="w-layout-hflex fpd-total-calc-flex"><img src="/images/acquisition.png" loading="lazy" alt="" class="fpd-total-calc-icons"/>
              <div class="fpd-total-calc-text">
                <h5 class="fpd-total-calc-h4">Total Sales</h5>
                <h4 class="fpd-total-calc-h5">135,000 <span class="fpd-total-calc-h5-span"></span></h4>
              </div>
            </div>
          </div>
          <div class="fpd-calc-item">
            <div class="w-layout-hflex fpd-total-calc-flex"><img src="/images/acquisition.png" loading="lazy" alt="" class="fpd-total-calc-icons"/>
              <div class="fpd-total-calc-text">
                <h5 class="fpd-total-calc-h4">Total Revenue</h5>
                <h4 class="fpd-total-calc-h5">135,000 <span class="fpd-total-calc-h5-span"></span></h4>
              </div>
            </div>
          </div>
          <div class="fpd-calc-item">
            <div class="w-layout-hflex fpd-total-calc-flex"><img src="/images/stock.png" loading="lazy" alt="" class="fpd-total-calc-icons"/>
              <div class="fpd-total-calc-text">
                <h5 class="fpd-total-calc-h4">Total Stocked</h5>
                <h4 class="fpd-total-calc-h5">135,000 <span class="fpd-total-calc-h5-span"></span></h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-layout-hflex fpd-tab-link-container">
        <div class="fpd-tab-link-wrapper">
          <a href="#" class="fpd-tab-link active">Expenses</a>
        </div>
        <div class="fpd-tab-link-wrapper">
          <a href="#" class="fpd-tab-link">Selling</a>
        </div>
        <div class="fpd-tab-link-wrapper"></div>
        <div class="fpd-tab-link-wrapper"></div>
      </div>
    </div>
  </section>
  )
}

export default ProjectDetails