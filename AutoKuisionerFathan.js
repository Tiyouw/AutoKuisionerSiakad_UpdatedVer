async function kuis(matkul, dosen) {
  try {
    const response = await fetch(`https://siakad.unej.ac.id/Kuesioner/Inputkuesioner?idmatakuliah=${matkul}&iddosen=${dosen}`, {
      method: "POST",
      headers: {
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-GB,en;q=0.9,en-US;q=0.8,id;q=0.7",
        "cache-control": "max-age=0",
        "content-type": "application/x-www-form-urlencoded",
        "sec-ch-ua": '"Not/A)Brand";v="8", "Chromium";v="126", "Microsoft Edge";v="126"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        Referer: "https://siakad.unej.ac.id/Kuesioner/formkuesioner2",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: "idaspek%5B0%5D=f8dba6e3-c8d8-4248-815f-1ab0a568a665&kdjawaban%5B0%5D=DC098DD5-2883-45D7-B8EE-B1233F26FB77&idaspek%5B1%5D=aa9f1baa-39f2-41e0-b912-ec4cf9627c2b&kdjawaban%5B1%5D=DC098DD5-2883-45D7-B8EE-B1233F26FB77&idaspek%5B2%5D=c0483469-258e-49a2-9f0f-f36579de31f1&kdjawaban%5B2%5D=DC098DD5-2883-45D7-B8EE-B1233F26FB77&idaspek%5B3%5D=9270789c-5836-4944-b0dd-078de4e761fe&kdjawaban%5B3%5D=DC098DD5-2883-45D7-B8EE-B1233F26FB77&idaspek%5B4%5D=2e507900-8112-4f47-a2ea-29e958080138&kdjawaban%5B4%5D=DC098DD5-2883-45D7-B8EE-B1233F26FB77&idaspek%5B5%5D=3d80e263-b59a-4d4d-b418-44bbfb7409b4&kdjawaban%5B5%5D=DC098DD5-2883-45D7-B8EE-B1233F26FB77&idaspek%5B6%5D=28d86ea2-5090-4357-8dd3-77d97ac563de&kdjawaban%5B6%5D=DC098DD5-2883-45D7-B8EE-B1233F26FB77&idaspek%5B7%5D=7c43a7e8-65a7-49c5-8ec4-8f84507b3ef8&kdjawaban%5B7%5D=DC098DD5-2883-45D7-B8EE-B1233F26FB77&idaspek%5B8%5D=cbfb7a53-41d0-4586-8f0a-01f0cc827420&kdjawaban%5B8%5D=DC098DD5-2883-45D7-B8EE-B1233F26FB77&idaspek%5B9%5D=c699b565-89d5-4203-a211-bdd061ea7568&kdjawaban%5B9%5D=DC098DD5-2883-45D7-B8EE-B1233F26FB77&idaspek%5B10%5D=3da10efd-0385-4f5c-8dfb-6f30b9f0a704&kdjawaban%5B10%5D=DC098DD5-2883-45D7-B8EE-B1233F26FB77&idaspek%5B11%5D=a5e5e800-815a-4bbe-b955-5d1478314c5a&kdjawaban%5B11%5D=DC098DD5-2883-45D7-B8EE-B1233F26FB77&idaspek%5B12%5D=977832bc-65a7-4f9c-9a66-89a459510d41&kdjawaban%5B12%5D=DC098DD5-2883-45D7-B8EE-B1233F26FB77&idaspek%5B13%5D=ef5e0211-19b0-4b66-b50d-0a0946f1a399&kdjawaban%5B13%5D=DC098DD5-2883-45D7-B8EE-B1233F26FB77&nilai=",
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok. Status: ${response.status}`);
    }

    const data = await response.text();
    console.log(`Kuesioner untuk matkul ${matkul}, dosen ${dosen} berhasil dikirim.`);
    console.log("Response dari server:", data); // Log respons untuk debugging jika perlu
  } catch (error) {
    console.error("Error submitting questionnaire:", error);
  }
}

async function kirim() {
  const lihatLinks = document.querySelectorAll('a[title="lihat"]');
  const onclickValues = Array.from(lihatLinks).map((link) => link.getAttribute("onclick"));
  const idPattern = /"([^"]+)"/g;

  const extractedIds = onclickValues.map((value) => {
    const matches = Array.from(value.matchAll(idPattern)).map((match) => match[1]);
    return matches;
  });

  await Promise.all(
    extractedIds.map(async (ids) => {
      const [matkul, dosen] = ids;
      await kuis(matkul, dosen);
    })
  );
}

kirim();
