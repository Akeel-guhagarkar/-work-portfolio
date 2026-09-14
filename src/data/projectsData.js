import portfolioImg from '../assets/images/project-01-portfolio.jpg';
import mauliImg from '../assets/images/project-02-mauli.jpg';
import cleanmaxImg from '../assets/images/project-03-cleanmax.jpg';

export const projectsData = [
  {
    id: '01',
    number: '01',
    name: 'My Portfolio',
    category: 'PERSONAL PORTFOLIO',
    description: "A modern personal portfolio showcasing Akeel's projects, technical skills, experience and professional work.",
    image: portfolioImg,
    url: 'https://akeel-guhagarkar.github.io/my-portfolio/',
    layout: 'imageLeft'
  },
  {
    id: '02',
    number: '02',
    name: 'Mauli Homestay',
    category: 'WEBSITE DESIGN & DEVELOPMENT',
    description: 'A professional responsive website created for Mauli Homestay with a clean and user-friendly digital experience.',
    image: mauliImg,
    url: 'https://maulihomestay.com/',
    layout: 'imageRight'
  },
  {
    id: '03',
    number: '03',
    name: 'CleanMax O&M Dashboard',
    category: 'DASHBOARD / WEB APPLICATION',
    description: 'A professional O&M procurement dashboard designed to present operational and procurement information through an interactive digital interface.',
    image: cleanmaxImg,
    url: 'https://akeel-guhagarkar.github.io/cleanmax-dashboard/',
    layout: 'imageLeft'
  }
];
