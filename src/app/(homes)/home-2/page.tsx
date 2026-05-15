import React from 'react';
import { Metadata } from 'next';
import HomeTwoMain from '@/pages/homes/home-2';
import HomeThreeMain from '@/pages/homes/home-3';
import HomeFourMain from '@/pages/homes/home-4';


export const metadata: Metadata = {
  title: "Shalom.js - Home Two Page",
};

const HomePageTwo = () => {
  return (
    <HomeFourMain/>
  );
};

export default HomePageTwo;