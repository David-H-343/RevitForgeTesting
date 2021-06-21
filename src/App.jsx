import React, { Component } from 'react';
import ForgeViewer from 'react-forge-viewer';
import './App.css';
 
class App extends Component {
 
  constructor(props){
    super(props);
 
    this.state = {
      view:null
    }
  }
 
  handleViewerError(error){
    console.log('Error loading viewer.');
  }
 
  /* after the viewer loads a document, we need to select which viewable to
  display in our component */
  handleDocumentLoaded(doc, viewables){
      console.log("Viewables:");
      console.log(viewables);
    if (viewables.length === 0) {
      console.error('Document contains no viewables.');
    }
    else{
      //Select the first viewable in the list to use in our viewer component
      this.setState({view:viewables[0]});
    }
  }
 
  handleDocumentError(viewer, error){
    console.log('Error loading a document');
  }
 
  handleModelLoaded(viewer, model){
    console.log('Loaded model:', model);
  }
 
  handleModelError(viewer, error){
    console.log('Error loading the model.');
  }
 
  getForgeToken(){
    /* Normally, this would call an endpoint on your server to generate a public
    access token (using your client id and sercret). Doing so should yield a
    response that looks something like the following...
    */
    return {
      access_token:"eyJhbGciOiJSUzI1NiIsImtpZCI6IlU3c0dGRldUTzlBekNhSzBqZURRM2dQZXBURVdWN2VhIn0.eyJzY29wZSI6WyJjb2RlOmFsbCIsImRhdGE6d3JpdGUiLCJkYXRhOnJlYWQiLCJidWNrZXQ6Y3JlYXRlIiwiYnVja2V0OmRlbGV0ZSIsImJ1Y2tldDpyZWFkIl0sImNsaWVudF9pZCI6Img3Wm1HbGZHdWxBY0ZLT1BPS0JVUGlYbkE3VFhpSHVVIiwiYXVkIjoiaHR0cHM6Ly9hdXRvZGVzay5jb20vYXVkL2Fqd3RleHA2MCIsImp0aSI6ImZScVVFVldTYkNZNFpBZXVaQXJhYjlWZlF5MzRFeFJNZ29oTGdSaVA0VkFxNE1uSEI3aFRRN0JmcnUwVXJPZVoiLCJleHAiOjE2MjQyODQ4NTJ9.ZvmM_eUjzooBphqX2XZd8rSCQetQRiN7ENxox97-0Y1aWzm4xX_cchSo1Rgl7tLZADwZl58HZ8fU_hX1OTknAzLhHd530wOwub1pxr1f76yo9RE1Vw-lLPmBqE7BEvN9T35axr1JiMjaImAoYUFXmZFprhQSgT01EWyq1lMeq-t8cjC_metLwVREiGR-UzfKfDfbAeqmR5keOm_jv6KVg9_d4j8Aq8n5m0SRlsWpLZlYp3jTY3Pk21uWRsfVdE6dCdrJ_3stPN6utGzDNKxOYKZP1sMJi44G-pBNTFMfEy9CCC_G2XgZnuykiaArLwTdd9x1XC5lO51Z5_jQ-4H-LQ",
      expires_in: 3599,
      token_type: "Bearer"
    };
  }
 
  /* Once the viewer has initialized, it will ask us for a forge token so it can
  access the specified document. */
  handleTokenRequested(onAccessToken){
    console.log('Token requested by the viewer.');
    if(onAccessToken){
      let token = this.getForgeToken();
      if(token)
        onAccessToken(
          token.access_token, token.expires_in);
    }
  }
 
  render() {
    return (
      <div>
          HELLO WORLDS
        <ForgeViewer
          version="6.0"
          urn="dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dGFrZW9mZi9yYWNfYmFzaWNfc2FtcGxlX3Byb2plY3QucnZ0"
          view={this.state.view}
          headless={false}
          onViewerError={this.handleViewerError.bind(this)}
          onTokenRequest={this.handleTokenRequested.bind(this)}
          onDocumentLoad={this.handleDocumentLoaded.bind(this)}
          onDocumentError={this.handleDocumentError.bind(this)}
          onModelLoad={this.handleModelLoaded.bind(this)}
          onModelError={this.handleModelError.bind(this)}
        />
      </div>
    );
  }
}
 
export default App;