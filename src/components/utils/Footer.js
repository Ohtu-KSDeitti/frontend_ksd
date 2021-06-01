import React from 'react'

const Footer = () => (
  <footer className="bg-light text-center text-white" style={{ paddingTop: '30em' }}>
    <div className="container p-4 pb-0">
      <section className="mb-4">
        <a
          className="btn btn-primary btn-floating m-1"
          style={{ 'background-color': '#3b5998;' }}
          href="https://www.facebook.com/groups/575539649714586/discussion/preview"
          role="button"
        ><i className="fab fa-facebook" />
        </a>
      </section>
    </div>
    <div className="text-center p-3" style={{ 'background-color': 'rgba(0, 0, 0, 0.2);' }}>
      © 2020 Copyright:
      <a className="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
    </div>
  </footer>
)

export default Footer
