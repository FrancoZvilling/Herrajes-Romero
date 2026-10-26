import ExcelJS from "exceljs";

export async function exportCatalogToExcel(products: any[], categories: any[] = []) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Casa Romero Herrajes";
  workbook.lastModifiedBy = "Casa Romero Admin";
  workbook.created = new Date();
  workbook.modified = new Date();

  // Diccionario de categorías para mostrar nombres legibles en lugar del slug
  const categoryMap = new Map<string, string>();
  categories.forEach((c) => {
    categoryMap.set(c.slug, c.name);
  });

  // Ordenar productos: primero por categoría, luego por subcategoría, luego por nombre
  const sortedProducts = [...products].sort((a, b) => {
    const catA = categoryMap.get(a.category) || a.category || "";
    const catB = categoryMap.get(b.category) || b.category || "";
    const catCompare = catA.localeCompare(catB);
    if (catCompare !== 0) return catCompare;

    const subA = a.subcategory || "";
    const subB = b.subcategory || "";
    const subCompare = subA.localeCompare(subB);
    if (subCompare !== 0) return subCompare;

    return (a.name || "").localeCompare(b.name || "");
  });

  // ==========================================
  // HOJA 1: CATÁLOGO COMPLETO
  // ==========================================
  const sheet = workbook.addWorksheet("Catálogo Completo", {
    views: [{ showGridLines: true }],
  });

  // Ancho de columnas espacioso y cómodo
  sheet.columns = [
    { key: "index", width: 8 },
    { key: "name", width: 40 },
    { key: "category", width: 26 },
    { key: "subcategory", width: 24 },
    { key: "brand", width: 22 },
    { key: "variants", width: 42 },
    { key: "description", width: 55 },
  ];

  // 1. Banner Principal de Título (A1 a G1)
  sheet.mergeCells("A1:G1");
  const titleCell = sheet.getCell("A1");
  titleCell.value = "CASA ROMERO HERRAJES — CATÁLOGO COMPLETO DE PRODUCTOS";
  titleCell.font = { name: "Arial", size: 14, bold: true, color: { argb: "FFFFFFFF" } };
  titleCell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFEA580C" }, // Naranja de marca Casa Romero
  };
  titleCell.alignment = { horizontal: "center", vertical: "middle" };
  sheet.getRow(1).height = 36;

  // 2. Subtítulo con fecha y total (A2 a G2)
  sheet.mergeCells("A2:G2");
  const subtitleCell = sheet.getCell("A2");
  const todayStr = new Intl.DateTimeFormat("es-AR", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date());

  subtitleCell.value = `Documento generado el: ${todayStr}  ·  Total de artículos: ${products.length}`;
  subtitleCell.font = { name: "Arial", size: 10, italic: true, color: { argb: "FF64748B" } };
  subtitleCell.alignment = { horizontal: "center", vertical: "middle" };
  sheet.getRow(2).height = 22;

  // Fila 3 en blanco para aire
  sheet.getRow(3).height = 10;

  // 3. Encabezados de Tabla (Fila 4)
  const headerRow = sheet.getRow(4);
  headerRow.values = [
    "#",
    "PRODUCTO",
    "CATEGORÍA",
    "SUBCATEGORÍA",
    "MARCA",
    "VARIANTES / OPCIONES",
    "DESCRIPCIÓN",
  ];
  headerRow.height = 28;

  headerRow.eachCell((cell) => {
    cell.font = { name: "Arial", size: 11, bold: true, color: { argb: "FFFFFFFF" } };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF1E293B" }, // Slate oscuro industrial
    };
    cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
    cell.border = {
      top: { style: "medium", color: { argb: "FF0F172A" } },
      bottom: { style: "medium", color: { argb: "FF0F172A" } },
      left: { style: "thin", color: { argb: "FF334155" } },
      right: { style: "thin", color: { argb: "FF334155" } },
    };
  });

  // 4. Filas de Datos
  sortedProducts.forEach((p, idx) => {
    const rowNum = idx + 5;
    const row = sheet.getRow(rowNum);

    // Formatear variantes legibles
    let variantsText = "-";
    if (p.variants && p.variants.length > 0) {
      variantsText = p.variants
        .map((v: any) => `${v.name}: ${v.options?.map((o: any) => o.value).join(", ")}`)
        .join(" | ");
    }

    const catName = categoryMap.get(p.category) || p.category || "-";
    const isEven = idx % 2 === 0;
    const rowBg = isEven ? "FFFFFFFF" : "FFF8FAFC"; // Cebra sutil

    row.values = [
      idx + 1,
      p.name || "-",
      catName,
      p.subcategory || "-",
      p.brand || "-",
      variantsText,
      p.description || "-",
    ];

    row.height = 24;

    row.eachCell((cell, colNumber) => {
      cell.font = { name: "Arial", size: 10, color: { argb: "FF1E293B" } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: rowBg },
      };
      cell.border = {
        top: { style: "thin", color: { argb: "FFE2E8F0" } },
        bottom: { style: "thin", color: { argb: "FFE2E8F0" } },
        left: { style: "thin", color: { argb: "FFE2E8F0" } },
        right: { style: "thin", color: { argb: "FFE2E8F0" } },
      };

      // Alineaciones específicas
      if (colNumber === 1) {
        cell.alignment = { vertical: "middle", horizontal: "center" };
      } else {
        cell.alignment = { vertical: "middle", horizontal: "left" };
      }

      // Nombre en negrita
      if (colNumber === 2) {
        cell.font = { name: "Arial", size: 10, bold: true, color: { argb: "FF0F172A" } };
      }
    });
  });

  // ==========================================
  // HOJA 2: RESUMEN POR CATEGORÍA
  // ==========================================
  const summarySheet = workbook.addWorksheet("Resumen por Categoría", {
    views: [{ showGridLines: true }],
  });

  summarySheet.columns = [
    { key: "index", width: 8 },
    { key: "category", width: 32 },
    { key: "productsCount", width: 20 },
    { key: "subcategories", width: 45 },
  ];

  summarySheet.mergeCells("A1:D1");
  const sumTitle = summarySheet.getCell("A1");
  sumTitle.value = "RESUMEN DE PRODUCTOS POR LÍNEA / CATEGORÍA";
  sumTitle.font = { name: "Arial", size: 13, bold: true, color: { argb: "FFFFFFFF" } };
  sumTitle.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF1E293B" },
  };
  sumTitle.alignment = { horizontal: "center", vertical: "middle" };
  summarySheet.getRow(1).height = 32;

  const sumHeader = summarySheet.getRow(3);
  sumHeader.values = ["#", "CATEGORÍA", "TOTAL PRODUCTOS", "SUBCATEGORÍAS ACTIVAS"];
  sumHeader.height = 26;
  sumHeader.eachCell((cell) => {
    cell.font = { name: "Arial", size: 11, bold: true, color: { argb: "FFFFFFFF" } };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFEA580C" },
    };
    cell.alignment = { vertical: "middle", horizontal: "center" };
    cell.border = {
      top: { style: "thin", color: { argb: "FF000000" } },
      bottom: { style: "thin", color: { argb: "FF000000" } },
      left: { style: "thin", color: { argb: "FF000000" } },
      right: { style: "thin", color: { argb: "FF000000" } },
    };
  });

  // Agrupar conteos
  const catSummary = categories.map((c, i) => {
    const prodsInCat = products.filter((p) => p.category === c.slug);
    const subcats = Array.from(new Set(prodsInCat.map((p) => p.subcategory).filter(Boolean)));
    return {
      index: i + 1,
      name: c.name,
      count: prodsInCat.length,
      subcategories: subcats.length > 0 ? subcats.join(", ") : "Sin subcategorías",
    };
  });

  catSummary.forEach((cat, idx) => {
    const row = summarySheet.getRow(idx + 4);
    row.values = [cat.index, cat.name, cat.count, cat.subcategories];
    row.height = 22;

    const isEven = idx % 2 === 0;
    const rowBg = isEven ? "FFFFFFFF" : "FFF8FAFC";

    row.eachCell((cell, colNum) => {
      cell.font = { name: "Arial", size: 10 };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: rowBg },
      };
      cell.border = {
        top: { style: "thin", color: { argb: "FFE2E8F0" } },
        bottom: { style: "thin", color: { argb: "FFE2E8F0" } },
        left: { style: "thin", color: { argb: "FFE2E8F0" } },
        right: { style: "thin", color: { argb: "FFE2E8F0" } },
      };
      if (colNum === 1 || colNum === 3) {
        cell.alignment = { vertical: "middle", horizontal: "center" };
      } else {
        cell.alignment = { vertical: "middle", horizontal: "left" };
      }
      if (colNum === 2) {
        cell.font = { name: "Arial", size: 10, bold: true };
      }
    });
  });

  // Generar y descargar archivo en el navegador
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const dateStr = new Date().toISOString().slice(0, 10);
  a.download = `Catalogo_Casa_Romero_${dateStr}.xlsx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
