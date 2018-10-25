import React from 'react';
import ReactLoading from 'react-loading';
 
const LoadingAnim = ({ type, color }) => (
    <ReactLoading type={type} color={color} height={'5%'} width={'5%'} />
);
 
export default LoadingAnim;