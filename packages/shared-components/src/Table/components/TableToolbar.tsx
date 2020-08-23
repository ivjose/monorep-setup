import React from 'react';
import clsx from 'clsx';

import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Tooltip from '@material-ui/core/Tooltip';

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      // flex: '1 1 100%',
      width: 'auto',
    },
    titleFull: {
      flex: '1 1 100%',
    },
    actionPanel: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    searchBox: {
      marginLeft: 16,
    },
  })
);

type EnhancedTableToolbarProps = {
  numSelected: number;
  title: string;
  render: JSX.Element;
  searchText?: string;
  setSearchText: (value: string) => void;
  search?: boolean;
};

const TableToolbar: React.FC<EnhancedTableToolbarProps> = ({
  title,
  numSelected,
  render,
  searchText,
  setSearchText,
  search,
}) => {
  const classes = useToolbarStyles();
  const handleSearchValue = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.titleFull}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}
      <div className={classes.actionPanel}>
        {render}
        {search && (
          <TextField
            // id="standard-basic"
            className={classes.searchBox}
            placeholder="Search"
            value={searchText}
            onChange={handleSearchValue}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Tooltip title="Search">
                    <SearchIcon fontSize="small" />
                  </Tooltip>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    disabled={!searchText}
                    onClick={() => setSearchText('')}
                    aria-label="Clear Search table"
                  >
                    <CloseIcon fontSize="small" aria-label="clear" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      </div>
    </Toolbar>
  );
};

export default TableToolbar;
