function getDataApi(body, calback) {
    fetch("https://jscp-diplom.netoserver.ru/", {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => response.json())
      .then((data) => calback(data));
  }
  