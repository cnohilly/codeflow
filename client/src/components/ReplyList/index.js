import React from 'react';
import { Row } from 'react-bootstrap';
import Reply from '../Reply';

const ReplyList = () => {

  return (
    <Row xs={1} className="g-3">

      {/* test reply */}
      <Reply />
      
    </Row>
  );
};

export default ReplyList;