export interface FacebookFeed{
    id: string
    name: string
    feed: Feed
}

interface Feed{
    data: DataItem[]
    paging: {cursors: Cursors, next: string}
}

interface DataItem{
    full_picture: string
    message: string
    permalink_url: string
    id: string
    created_time: string
    comments?: Comments
    shares?: {count: number}
}

interface Cursors{
    before: string
    after: string
}

interface Comments{
    data: {id: string}[]
    paging: {cursors: Cursors, next: string}
}

/*
    "name": "schussfreude.ch",
    "feed": {
      "data": [
        {
          "full_picture": "https://scontent.fzrh3-1.fna.fbcdn.net/v/t39.30808-6/386593573_871478891644236_3452796451545780012_n.jpg?stp=dst-jpg_p720x720&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=f18lVECfFZwAX9IxAtC&_nc_ht=scontent.fzrh3-1.fna&edm=AJdBtusEAAAA&oh=00_AfDBOrhtRG4g52mNdbV9xyvqYBhHzvfxp7OeOT4TGcfRGw&oe=6608A9CC",
          "message": "Ich darf ja Bilder von Kessler Auktionen AG für Artikel nutzen. Manchmal ist das Suchen nach Bildern aber zeitaufwändig. Warum also nicht die staubigen Python-Skills ausgraben und selbst eine \"Kessler Datenbank\" basteln? Ja, swisswaffen.com hat etwas Ähnliches, aber eben nicht ganz das, was ich brauche...",
          "permalink_url": "https://www.facebook.com/1008997497892374/posts/871479114977547",
          "id": "796983240440857_871479114977547"
        },
        {
          "full_picture": "https://external.fzrh3-1.fna.fbcdn.net/emg1/v/t13/7661189197204082517?url=https%3A%2F%2Fschussfreude-next-cl79a6j9p-m00gendai.vercel.app%2FlogoSq.png&fb_obo=1&utld=vercel.app&ccb=13-1&stp=dst-emg0_q75&ur=50234c&_nc_sid=64c8fc&oh=06_AbHxbNr9rlnjghR1YBAbTVlmo6GqFsLXJFJ51Eow8o_qTw&oe=6604D981",
          "message": "Die neue Version von schussfreude.ch geht in die Public Beta:
    - Die alte Webseite ist ab sofort nicht mehr aufrufbar
    - Die Inhalte sind entsprechend portiert und allenfalls angepasst worden
    - Die ganze DSGVO- und Cookie-Geschichte ist implementiert (Analytics Tracking wird nur bei akzeptierten Cookies gestartet, sonst nicht)
    - Kontaktformular sollte auch funktionieren 
    
    Ich bin gespannt, wie die neue Version ankommt. Arbeiten damit lässt sich jedenfalls um Welten angenehmer.
    
    Für Rückmeldungen aller Art bin ich gerne empfänglich, egal ob Lobgesang, Schimpf & Schande, Verbesserungsvorschläge, Ideen, etc...",
          "permalink_url": "https://www.facebook.com/1008997497892374/posts/865775882214537",
          "id": "796983240440857_865775882214537"
        },
        {
          "full_picture": "https://scontent.fzrh3-1.fna.fbcdn.net/v/t39.30808-6/381711957_862647525860706_2423193360258913012_n.jpg?stp=dst-jpg_p720x720&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=sae8q6Ubq3wAX98FQMI&_nc_ht=scontent.fzrh3-1.fna&edm=AJdBtusEAAAA&oh=00_AfBCMh_tDsRP39c86JgjUuC9-eHJwqDaCQaZVfJSYAAMkA&oe=6607B674",
          "message": "Während des Schiessens gerechnet, vom falschen Maximum ausgegangen, gedacht es müssen nich sechs 5er her für wenigstens die Anerkennungskarte... und man dann den Warner für einen Witzbold hält, wenn er nach Kranz oder Karte fragt. 
    
    Immer Mühe geben, schöne Schüsse zu geben, auch wenns fast aussichtslos scheint ;)",
          "permalink_url": "https://www.facebook.com/1008997497892374/posts/862647482527377",
          "id": "796983240440857_862647482527377"
        },
        {
          "full_picture": "https://external.fzrh3-1.fna.fbcdn.net/emg1/v/t13/17185466565480128951?url=https%3A%2F%2Fschussfreude.ch%2Fwp-content%2Fuploads%2F2017%2F06%2FSwiss-Logo.jpg&fb_obo=1&utld=schussfreude.ch&ccb=13-1&stp=dst-emg0_q75&ur=50234c&_nc_sid=64c8fc&oh=06_AbGKC8Mo4A8hY4C7lQWmLF8g75-UJxhUY2Y4Rei8LvdTkQ&oe=6604E1F1",
          "message": "Alles neu macht der... August... vielleicht wird es auch Mai, bis das ganze fertig ist.
    
    Ab dann darf wieder mit mehr Artikel gerechnet werden!",
          "permalink_url": "https://www.facebook.com/1008997497892374/posts/830259702432822",
          "id": "796983240440857_830259702432822"
        },
        {
          "full_picture": "https://scontent.fzrh3-1.fna.fbcdn.net/v/t39.30808-6/309155348_533484502110345_4559803734487120306_n.jpg?stp=dst-jpg_p720x720&_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=7vrgdO8SISsAX8KfzSM&_nc_ht=scontent.fzrh3-1.fna&edm=AJdBtusEAAAA&oh=00_AfBZvQvHnC58ppA19ibmbKt-rcLF-Xg1Q0pOXHj8FDImAA&oe=66090039",
          "message": "Kann man gelten lassen :D Nach Jahren des (knappen) Versagens liefs heute mal richtig gut.",
          "permalink_url": "https://www.facebook.com/1008997497892374/posts/533484518777010",
          "id": "796983240440857_533484518777010"
        },
        {
          "full_picture": "https://scontent.fzrh3-1.fna.fbcdn.net/v/t39.30808-6/306816894_521352299990232_4156416344661775478_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=BXyMDfJy-QkAX_xC5rK&_nc_ht=scontent.fzrh3-1.fna&edm=AJdBtusEAAAA&oh=00_AfADdZGnmNQ8u9Y5bcszpVySd2_zXyqr2KybN1rVWsbhsA&oe=66093D7E",
          "message": "Ab nächstes Jahr ist endlich das Swissproducts-Zubehör SSV-zugelassen! Eine gute Alternative zum Wyss-Zubehör.",
          "permalink_url": "https://www.facebook.com/1008997497892374/posts/521352319990230",
          "id": "796983240440857_521352319990230"
        },
        {
          "full_picture": "https://scontent.fzrh3-1.fna.fbcdn.net/v/t39.30808-6/288868373_2359696364169529_5755339342575936963_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=l3Tp2U8aW4gAX-_Enp1&_nc_oc=AdgsTeBwbP1vsOybyz1m4dPuSjpOSvdJC4LL9-U15PG5823phdnicrcfJ-p-BzqwD3o&_nc_ht=scontent.fzrh3-1.fna&edm=AJdBtusEAAAA&oh=00_AfBv5CbfxQW25gojAWGScYz0-ieCw7s0b1mw32umPwJ5Ew&oe=660863A6",
          "message": "Vielen Dank an Schweizer Waffen-Sammlerbörse 2022 ZT Fachmessen AG für die Einladung! Na dann bis morgen ;)",
          "permalink_url": "https://www.facebook.com/796983240440857/posts/2359696394169526/",
          "id": "796983240440857_2359696394169526"
        },
        {
          "full_picture": "https://external.fzrh3-1.fna.fbcdn.net/emg1/v/t13/17185466565480128951?url=https%3A%2F%2Fschussfreude.ch%2Fwp-content%2Fuploads%2F2017%2F06%2FSwiss-Logo.jpg&fb_obo=1&utld=schussfreude.ch&ccb=13-1&stp=dst-emg0_q75&ur=50234c&_nc_sid=64c8fc&oh=06_AbGKC8Mo4A8hY4C7lQWmLF8g75-UJxhUY2Y4Rei8LvdTkQ&oe=6604E1F1",
          "message": "Kleines Double-Feature zum Sonntag:
    2. Irisblende Match 90",
          "permalink_url": "https://www.facebook.com/796983240440857/posts/2345346552271177/",
          "id": "796983240440857_2345346552271177"
        },
        {
          "full_picture": "https://external.fzrh3-1.fna.fbcdn.net/emg1/v/t13/17185466565480128951?url=https%3A%2F%2Fschussfreude.ch%2Fwp-content%2Fuploads%2F2017%2F06%2FSwiss-Logo.jpg&fb_obo=1&utld=schussfreude.ch&ccb=13-1&stp=dst-emg0_q75&ur=50234c&_nc_sid=64c8fc&oh=06_AbGKC8Mo4A8hY4C7lQWmLF8g75-UJxhUY2Y4Rei8LvdTkQ&oe=6604E1F1",
          "message": "Kleines Double-Feature zum Sonntag:
    1. Hogue Pistolengriff zum Sturmgewehr 90",
          "permalink_url": "https://www.facebook.com/796983240440857/posts/2345345885604577/",
          "id": "796983240440857_2345345885604577"
        },
        {
          "full_picture": "https://scontent.fzrh3-1.fna.fbcdn.net/v/t39.30808-6/280169729_2325851010887398_672559119933275265_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=y2JnGH5MIWQAX-Jg6zU&_nc_ht=scontent.fzrh3-1.fna&edm=AJdBtusEAAAA&oh=00_AfCXrhBUtZbzkerHon6qHfL3GLHejCG5n1q37YcoT8XRSg&oe=66083BEA",
          "message": "J. Staubs Bilderbuch, Anschauungsunterricht für Kinder. Vierter Band, Verlag von Gebrüder Künzli, Zürich 1918.",
          "permalink_url": "https://www.facebook.com/796983240440857/posts/2325851057554060/",
          "id": "796983240440857_2325851057554060"
        }
      ],
      "paging": {
        "cursors": {
          "before": "QVFIUjFLZA0hmX0NIRHB6NmFrUlJBd0FtS2haa2ZAiOENLODlLTm9EVGR1QXhsYmNITjJYc1ExcV9aNFRRRERROHMzNlcxdzdBR1psbFo5TUY4QWxvcV9Vd0xES01DX2stRmIzUjhBN2ZALME00RlpsWDdiQmJzQzVfU0xTekRxRkMyWDY4anJLWmt3clRWR2h2VVZAiUVZAJaUFQVlRhN0dvNFBYRzJfdHlCU0F3cWY2N2VCNlVNS2I3aHN2RjhUZA2tVaFJHdmJoby0tQWtqN3VhczdfbmFISk9oYmtINEhuZAlFtUkFGOVNzQmg0b1JLTGdaX2ROMTR2TThRd2hGTGJHU3FuRnZACV1cwQjBtZA01JOWc2X1BlZAVJaZAlJzMFJOVlY5cXRVVjFNTjdPaHg1R3d4SjR2SnM4N3FsY1B5aUl1RGZArN1hTcGR3ZAWt4MmxJa29MbzRGalRwUEZAZASWF5QTFOWlRrbGRaR04zVzQ5TFlYOXd3WlNCcnZAMcmNGTGMzdkp0Q3Q1ZAmk1Nm1tVnZAKTGZAoaWtQd0owdklmaHoybGJhMHoxb0F2QlpkWmhQZA3h5MDdwMEdFZAlNKN21GQTcwYkZATZA29sMGpHZAjc5SkhjbDVJNEFtSVdCTmF0ZA2hfZA29GNml0M0hUeDduNy1WUEg0ai1BR1lPX3phamUxX2xIa1gxeEJDTkZAKYzA1ekZAYbWxCSG0taU5CUl9UTDZAQdwZDZD",
          "after": "QVFIUnlnYU0wVTUzalF3OXZAJczJxTThRY29LWnc3T0dmV0VsVWkwYy1lY3NWX1hZAczFfMjhLQzJaVTB1WFJJMS1acW8wbDE0Q0pqcUg2T1BvWER3UjZAnVWU3TzFlZAkNZAeXRBZAnE0YXRrTEdRdVpmWjZAEckNPX0VvaEliSEpPSHoxYWhyVEkxNjIzUnJVUWxwcmRmVmtFNmhHLXppR1A2bTl0WVg1SUQyT3Nyby1ITE1Gd2RDem1YRmdOYjFGMW1JZADVDUVBVN3VjN1dHMTlLTXdMYS15ZAEN1b18wTnNJdnRUZA1ZAKeGZASUFl5QmV0b21kMWRsWmxIWF9YVHkwbE1OenkxLVJ6N21ZAdjRhU0FtWGtWQVJtekdJd1J1eUdKcS1yRHJPemh4YTJmN2xKMDc5aEM5M00wTFV1M2tfUEZAQNXZATS1pPRlB1UUtfMnBXYTdTZAHFQb09hb2JGeUtudGtaWGhxT1k1cVRmOHMtaFZAFZAXF3b0t2VnRXQmNOMnhqRE9ic0Rrd3Y1T3RoSWdtZAjVkTmo2clJ5eVB2SlJHZAmlValR4eS1NQlFBeGt3emFEeEIwSnB4ckdZAdzFNMmx2Q1RrVkhnZAnVZAU1lMOEpjaU9kWjQ0eENZATndZATnROTXpzQ0xQYmFlT2p0SVplbHNNa1Jxc1BxRW9HUnYtNk9vYkZAvZAmJNbTZARaGExUkdmRlg4SGlfMWZA0LWpUMTZA4U2ZAGZAmZAJNDhheDhNV2VBRF9oRko3VEpSMklFVVR1R0MxTkJTMVRUNzFPcGJuM0E4bGQ5NlJIMlJiNjY0QV9FRWZAsc0NRVXZApZAWRSM0RRNVFDWldWODk0dmt0YlE4bXA3dGlVSW9YbndibVcwZAEpaRVlrcDdkVXp6TFZADUTYyOVN2U1NyeTB0eExrcUp3NVVRSFVlRDJmem9YUW0zS3ZAhQXBVU0NieUV6cGdfX0ItSjJzZAGxsVFFNdzNZAMEljQ1hHMmhOY0wwdzlKbTlKQ01wTHlyMGk0ZAWdJVmtCdjFLVm5FcXNWVU1jQ2hUeEZAOeGpLLTUwd2diVG93MGFra0kzTlJqaXE4bnYySEJ3aHBUZAkhjSE9TNl9iZA3k2N1RWMVM1d1U4S1pnbXc3YnNmTElkZAXkzdy1FTDlzaUJ0d2FKekFTd3oycmZAOZA2RLdXcwN1lqTUJlNUNEVnp6MWJqMGRsY3VZATzVMdkFEbXNLbmd4eUd4SGtwSG1XMEVneTlmOVJweUFWSHczZADF4Y2F4d05ZAVFRnUS1kZAjJBQnZALOE02S09mYm9yMUtTZAU1CTVM2dHVFeGQ3MlVGZATgtVWx6VWFTNWdNWnY1ajZAUMWxmZAmNtMjZAtRjZACX29mMTZAGYUNvNTZApMkstM1pRQmZAHS0lYR1dXalVYM2lwUXBhc3FCUzVLVzJMQ1VyUGU0QnV3NmN2SmtsWnhQR3hCd2d1ajlDZADRKV19QTkJzbm00QVI5aEhMTU1EdVhQTG1zRHhGUElYZAUp3aFRONlIwZAXp4WEp4cEtQampwQWhkY3NZAZAGR0WGhGNkRkQUNXVGpFdXFMQWFDRDdhNWY2N0cxZA01aZAEU4MHZAqbHljREFnTWpqRW5zd2lNVHYwMjVfc3lPS1NyTEFnR2g1ZA3pCcjFnX0VMZAVhRZAy1GdFJKYjBLZAzUyaS1fQjBFbmtkdkk2alpqNnVpc05MbWpCemFibU5KMVhXWDkzX1VIR3U2VmtILWhybk9C"
        },
        "next": "https://graph.facebook.com/v19.0/796983240440857/feed?access_token=EAAE5RK7FhCwBO468CkXyrgdL49NePwIqklAoyzq4BnbG2ZBbchMiBFzHZCNmAT2D809bkoCY4mJq8d5rk45dbPuZBit62kTMUJAevm8yVrWZCGh4lFhbskaeA1cPF85UYiH3ezAZBMmYu4KwR4oZAm44qtOphfZCzM71QLn1lzivQyqejJ9lXk3Bk3cOjfOBbrGYketMMR1RAiLiwZAUmiDnfS0ZD&pretty=0&fields=full_picture%2Cmessage%2Cpermalink_url&limit=10&after=QVFIUnlnYU0wVTUzalF3OXZAJczJxTThRY29LWnc3T0dmV0VsVWkwYy1lY3NWX1hZAczFfMjhLQzJaVTB1WFJJMS1acW8wbDE0Q0pqcUg2T1BvWER3UjZAnVWU3TzFlZAkNZAeXRBZAnE0YXRrTEdRdVpmWjZAEckNPX0VvaEliSEpPSHoxYWhyVEkxNjIzUnJVUWxwcmRmVmtFNmhHLXppR1A2bTl0WVg1SUQyT3Nyby1ITE1Gd2RDem1YRmdOYjFGMW1JZADVDUVBVN3VjN1dHMTlLTXdMYS15ZAEN1b18wTnNJdnRUZA1ZAKeGZASUFl5QmV0b21kMWRsWmxIWF9YVHkwbE1OenkxLVJ6N21ZAdjRhU0FtWGtWQVJtekdJd1J1eUdKcS1yRHJPemh4YTJmN2xKMDc5aEM5M00wTFV1M2tfUEZAQNXZATS1pPRlB1UUtfMnBXYTdTZAHFQb09hb2JGeUtudGtaWGhxT1k1cVRmOHMtaFZAFZAXF3b0t2VnRXQmNOMnhqRE9ic0Rrd3Y1T3RoSWdtZAjVkTmo2clJ5eVB2SlJHZAmlValR4eS1NQlFBeGt3emFEeEIwSnB4ckdZAdzFNMmx2Q1RrVkhnZAnVZAU1lMOEpjaU9kWjQ0eENZATndZATnROTXpzQ0xQYmFlT2p0SVplbHNNa1Jxc1BxRW9HUnYtNk9vYkZAvZAmJNbTZARaGExUkdmRlg4SGlfMWZA0LWpUMTZA4U2ZAGZAmZAJNDhheDhNV2VBRF9oRko3VEpSMklFVVR1R0MxTkJTMVRUNzFPcGJuM0E4bGQ5NlJIMlJiNjY0QV9FRWZAsc0NRVXZApZAWRSM0RRNVFDWldWODk0dmt0YlE4bXA3dGlVSW9YbndibVcwZAEpaRVlrcDdkVXp6TFZADUTYyOVN2U1NyeTB0eExrcUp3NVVRSFVlRDJmem9YUW0zS3ZAhQXBVU0NieUV6cGdfX0ItSjJzZAGxsVFFNdzNZAMEljQ1hHMmhOY0wwdzlKbTlKQ01wTHlyMGk0ZAWdJVmtCdjFLVm5FcXNWVU1jQ2hUeEZAOeGpLLTUwd2diVG93MGFra0kzTlJqaXE4bnYySEJ3aHBUZAkhjSE9TNl9iZA3k2N1RWMVM1d1U4S1pnbXc3YnNmTElkZAXkzdy1FTDlzaUJ0d2FKekFTd3oycmZAOZA2RLdXcwN1lqTUJlNUNEVnp6MWJqMGRsY3VZATzVMdkFEbXNLbmd4eUd4SGtwSG1XMEVneTlmOVJweUFWSHczZADF4Y2F4d05ZAVFRnUS1kZAjJBQnZALOE02S09mYm9yMUtTZAU1CTVM2dHVFeGQ3MlVGZATgtVWx6VWFTNWdNWnY1ajZAUMWxmZAmNtMjZAtRjZACX29mMTZAGYUNvNTZApMkstM1pRQmZAHS0lYR1dXalVYM2lwUXBhc3FCUzVLVzJMQ1VyUGU0QnV3NmN2SmtsWnhQR3hCd2d1ajlDZADRKV19QTkJzbm00QVI5aEhMTU1EdVhQTG1zRHhGUElYZAUp3aFRONlIwZAXp4WEp4cEtQampwQWhkY3NZAZAGR0WGhGNkRkQUNXVGpFdXFMQWFDRDdhNWY2N0cxZA01aZAEU4MHZAqbHljREFnTWpqRW5zd2lNVHYwMjVfc3lPS1NyTEFnR2g1ZA3pCcjFnX0VMZAVhRZAy1GdFJKYjBLZAzUyaS1fQjBFbmtkdkk2alpqNnVpc05MbWpCemFibU5KMVhXWDkzX1VIR3U2VmtILWhybk9C"
      }
    }
    }
    */