export interface Medium {
    path: string
    title: string
    mime: string
    type: string
    description: string
    tags: string[]
    size: number
    colors: string[]
    width: number
    height: number
    _hash: string
    _created: number
    _modified: number
    _cby: string
    folder: string
    _id: string
  }

  export interface PageContent{
    page: string
    content: {title:string, text:string}[]
    _modified: number
    _mby: string
    _created:number
    _state: number
    _cby: string
    _id: string
}

export interface Metadata{
  page: string;
  title: string;
  description: string;
  image: Medium,
  _modified: number;
  _mby: string;
  _created: number;
  _state: number;
  _cby: string;
  _id: string;
}

export interface SiteContent{
    pageName: string
    content: {sectionTitle: string; sectionText: string; sectionAssets: Medium[]}[]
    _modified: number;
    _mby: string;
    _created: number;
    _state: number;
    _cby: string;
    _id: string;
    metadata: SiteMetaData;
    pageHeader: Medium
}

export interface SiteMetaData{
  metaPageName: string; 
  metaSiteDescription: string; 
  metaImage: Medium
}