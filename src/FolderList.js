import React, { Component } from 'react';
import classNames from 'classnames';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import ImageAvatars from './ImageAvatars';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ReactPlayer from 'react-player';
import HomeApp from './HomeApp';
import { Modal } from '@material-ui/core';

const stylesFolderList = theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: 'mediumseagreen',
    },
  });

  function saveURL(url, props, title, views, idVid){
    localStorage.setItem("urlVideo", url);
    localStorage.setItem("titulo", title);
    localStorage.setItem("views", views);
    localStorage.setItem("idVideo", idVid);
    props.updateState('video');
  }
  
  function FolderList(props) {
    const { classes } = props;
        return (
          <div className={classes.root}>
            <MenuList classes={classes.background}>
             {props.items.map(item=>(
                <MenuItem>
                  <a onClick={()=>saveURL(item.URLVideo, props, item.Titulo, item.Views, item.IdVideo)}>{item.Titulo}</a>
                </MenuItem>
             ))}
             <MenuItem>
               <ImageAvatars/>
               </MenuItem>
            </MenuList>
          </div>
        );
      }

  export default withStyles(stylesFolderList)(FolderList);