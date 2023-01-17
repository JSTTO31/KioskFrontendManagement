export interface link{
    url: string,
    label: string,
    active: boolean 
}

export interface Page{
    current_page: number,
    first_page_url: string,
    from: number,
    last_page: number,
    last_page_url: string,
    links: link[];
    next_page_url: string,
    path: string,
    per_page: string,
    prev_page_url: string,
    to: number,
    total: number,
    query: string
}