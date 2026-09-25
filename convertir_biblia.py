import json, sys, os

# Tipos que tratamos como títulos
TITLE_TYPES = {'heading1', 'heading2', 'heading3', 'heading', 'label', 'section1', 'section2'}

def convert_bible(input_file, output_file=None):
    if output_file is None:
        base, _ = os.path.splitext(input_file)
        output_file = f"{base}_berea.json"

    with open(input_file, 'r', encoding='utf-8-sig') as f:
        data = json.load(f)

    result = {}
    total_verses = 0

    for book in data.get('books', []):
        usfm = book.get('usfm', '').lower()
        if not usfm:
            continue
        chapters_dict = {}
        for chapter in book.get('chapters', []):
            ch_usfm = chapter.get('usfm', '')
            if '.' not in ch_usfm:
                continue
            ch_num = ch_usfm.split('.')[-1]
            items_list = []
            for item in chapter.get('items', []):
                itype = item.get('type', '')
                lines = item.get('lines', [])
                if not lines:
                    continue
                if itype in TITLE_TYPES:
                    title = ' '.join(lines).strip()
                    if title:
                        items_list.append({"h": title})
                elif itype == 'verse':
                    text = ' '.join(lines).strip()
                    if text:
                        items_list.append(text)
                        total_verses += 1
            if items_list:
                chapters_dict[ch_num] = items_list
        if chapters_dict:
            result[usfm] = chapters_dict

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    print(f"OK: {output_file}")
    print(f"Libros: {len(result)}")
    print(f"Versiculos: {total_verses}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python convertir_biblia.py <archivo_entrada.json>")
        sys.exit(1)
    convert_bible(sys.argv[1])