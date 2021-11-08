import React from 'react';
import { Icon } from '@iconify/react';
import peopleFill from '@iconify/icons-eva/people-fill';
import filmFill from '@iconify/icons-eva/film-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'seat',
    path: '/seat',
    icon: getIcon(peopleFill)
  },
  {
    title: 'movies',
    path: '/movies',
    icon: getIcon(filmFill)
  },
];

export default sidebarConfig;
