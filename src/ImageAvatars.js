import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const stylesImageAvatars = {
    row: {
      display: 'flex',
      justifyContent: 'center',
    },
    avatar: {
      margin: 10,
    },
    bigAvatar: {
      width: 60,
      height: 60,
    },
  };

  function ImageAvatars(props) {
    const { classes } = props;
    return (
      <div className={classes.row}>
         <Avatar
          alt="Adelle Charles"
          src={props.image}
          className={classNames(classes.avatar, classes.bigAvatar)}
        />
      </div>
    );
  }

  export default withStyles(stylesImageAvatars)(ImageAvatars);